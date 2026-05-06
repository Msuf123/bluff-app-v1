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
  console.log(allPlayers, otherPlayers, peerConnectionDbsStateCurrent);
  await Promise.allSettled(
    allPlayers.map(async ({ email }) => {
      const pc = new RTCPeerConnection(ices);
      pc.onconnectionstatechange = () => onConnectionStateChange(pc);
      pc.ontrack = event => onTrack(event, remoteAudio, setRemoteStream);
      pc.onicecandidate = event =>
        onIceCandidate(event, webSocket, yourEmail, email, data);
      pc.oniceconnectionstatechange = () => onIceStateChange(pc);
      const audioTrack = micMediaStreamState?.getAudioTracks()[0];
      if (audioTrack && audioTrack.readyState === 'live') {
        audioTrack.enabled = true;
        pc.addTrack(audioTrack, micMediaStreamState);
      } else {
        console.error(`❌ Audio track not live for ${email}`);
      }
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log('sending data', offer);
      webSocket.send(
        JSON.stringify({
          action: 'offer',
          from: yourEmail,
          to: email,
          offer,
          roomNumber: data.data.room,
        }),
      );
      setPeerConnectionState(ori => ({ ...ori, [email]: pc }));
    }),
  );
}
