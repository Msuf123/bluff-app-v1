import { RTCPeerConnection } from 'react-native-webrtc';
import onIceCandidate from './SubFunctions/onIceCandidate';
import onIceStateChange from './SubFunctions/onIceStateChange';
import onTrack from './SubFunctions/onTrack';
import onConnectionStateChange from './SubFunctions/onConnectionStateChange';

export default function makeOffer(
  data,
  ices,
  micMediaStreamState,
  setPeerConnectionState,
  Toast,
  webSocket,
  setMicLoading,
  remoteAudio,
  setRemoteStream,
) {
  const yourEmail = data.data.yourEmail;
  const otherPlayers = data.data.players.filter(p => p.email !== yourEmail);

  otherPlayers.forEach(async ({ email }) => {
    const pc = new RTCPeerConnection(ices);
    pc.onconnectionstatechange = () => onConnectionStateChange(pc);
    let audioElement = remoteAudio;

    pc.ontrack = event => {
      onTrack(event, audioElement, setRemoteStream);
    };
    pc.onicecandidate = event =>
      onIceCandidate(event, webSocket, yourEmail, email, data);

    pc.oniceconnectionstatechange = onIceStateChange(pc);
    let audioTrack = null;
    if (micMediaStreamState) {
      audioTrack = micMediaStreamState.getAudioTracks()[0];
    }

    if (audioTrack && audioTrack.readyState === 'live') {
      audioTrack.enabled = true;

      pc.addTrack(audioTrack, micMediaStreamState);
    } else {
      console.error('❌ Audio track not live, cannot add to PC');
    }

    pc.createOffer().then(offer => {
      console.log(offer, yourEmail, email, data.data.room);
      console.log(micMediaStreamState, 'jeje');
      pc.setLocalDescription(offer).then(() => {
        webSocket.send(
          JSON.stringify({
            action: 'offer',
            from: yourEmail,
            to: email,
            offer,
            roomNumber: data.data.room,
          }),
        );
      });
    });
    setPeerConnectionState(ori => ({ ...ori, [email]: pc }));
  });
}
