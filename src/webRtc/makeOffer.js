import { RTCPeerConnection } from 'react-native-webrtc';
import onIceCandidate from './SubFunctions/onIceCandidate';
import onIceStateChange from './SubFunctions/onIceStateChange';
import onTrack from './SubFunctions/onTrack';
import onConnectionStateChange from './SubFunctions/onConnectionStateChange';

export default async function makeOffer(
  data,
  ices,
  micMediaStreamState,
  peerConnectionDbsStateCurrent,
  setPeerConnectionState,
  Toast,
  webSocket,
  setMicLoading,
  remoteAudio,
  setRemoteStream,
  reconnetWebRtc,
) {
  const yourEmail = data.data.yourEmail;
  const otherPlayers = data.data.players.filter(p => p.email !== yourEmail);
  // reconnetWebRtc this means that voice comminicaiton was there but at that time my mic was off so sending offer to all the people again that are in my dbs
  let allPlayers = [];

  if (!reconnetWebRtc) {
    //code here means that we are not reconnecting just establing new connection
    otherPlayers.map(item => {
      if (!peerConnectionDbsStateCurrent[item.email]) {
        allPlayers.push(item);
      }
    });
  } else {
    //meaing we are reconnecting
    allPlayers = [...otherPlayers];
  }

  await Promise.allSettled(
    allPlayers.map(async ({ email }) => {
      if (reconnetWebRtc && peerConnectionDbsStateCurrent[email]) {
        const oldPc = peerConnectionDbsStateCurrent[email];
        oldPc.onicecandidate = null;
        oldPc.ontrack = null;
        oldPc.onconnectionstatechange = null;
        oldPc.oniceconnectionstatechange = null;
        oldPc.close();
      }
      const pc = new RTCPeerConnection(ices);
      pc.onconnectionstatechange = () =>
        onConnectionStateChange(pc, email, () => {});
      pc.ontrack = event => onTrack(event, remoteAudio, setRemoteStream);
      pc.onicecandidate = event =>
        onIceCandidate(event, webSocket, yourEmail, email, data);
      pc.oniceconnectionstatechange = () => onIceStateChange(pc);
      // const audioTrack = micMediaStreamState?.getAudioTracks()[0];
      const audioTrack = micMediaStreamState?.getAudioTracks()?.[0];

      if (audioTrack) {
        // muted mic still works
        audioTrack.enabled = audioTrack.enabled ?? true;

        pc.addTrack(audioTrack, micMediaStreamState);
      } else {
        console.warn('No local audio track, adding recvonly transceiver');
        noMicPlayers.push(email);
        pc.addTransceiver('audio', {
          direction: 'recvonly',
        });
      }
      // Store pc FIRST, then create offer becaue we can get ICE candidates can fire during createOffer and setLocalDescription  will try to read a pc from pcDbs that isn't stored yet
      setPeerConnectionState(ori => ({ ...ori, [email]: pc }));
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      webSocket.send(
        JSON.stringify({
          action: 'offer',
          from: yourEmail,
          to: email,
          offer,
          roomNumber: data.data.room,
        }),
      );
    }),
  );
}
