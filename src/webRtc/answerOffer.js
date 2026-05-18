import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import onConnectionStateChange from './SubFunctions/onConnectionStateChange';
import onIceCandidate from './SubFunctions/onIceCandidate';
import onIceStateChange from './SubFunctions/onIceStateChange';
import onTrack from './SubFunctions/onTrack';

export default async function answerOffer(
  ices,
  data,
  store,
  micStream,
  webScoket,
  setPeerConnectionState,
  playerGameArea,
  remoteAudio,
  setMicLoadingState,
  setRemoteStream,
) {
  const pc = new RTCPeerConnection(ices);
  pc.onconnectionstatechange = () =>
    onConnectionStateChange(pc, data.from, () => {
      console.log('Reconnecting', data.from);
    });
  let audioElement = remoteAudio;

  pc.ontrack = event => {
    onTrack(event, audioElement, setRemoteStream);
  };
  pc.onicecandidate = event => {
    onIceCandidate(
      event,
      webScoket,
      store.get(playerGameArea).yourEmail,
      data.from,
      { data: { room: store.get(playerGameArea).room } },
    );
  };
  pc.oniceconnectionstatechange = () => onIceStateChange(pc);

  try {
    await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

    let audioTrack;
    if (micStream) {
      audioTrack = micStream.getAudioTracks()[0];
    }

    if (audioTrack) {
      pc.addTrack(audioTrack, micStream);
    } else {
      console.log('NO mic was found in ', store.get(playerGameArea).yourEmail);
    }

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    webScoket.send(
      JSON.stringify({
        action: 'answer',
        from: store.get(playerGameArea).yourEmail,
        to: data.from,
        answer,
        roomNumber: store.get(playerGameArea).room,
      }),
    );

    setPeerConnectionState(ori => ({ ...ori, [data.from]: pc }));
  } catch (err) {
    console.error('❌ answerOffer failed for', data.from, err);
  }
}
