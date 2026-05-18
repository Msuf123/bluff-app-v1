import { RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

export default function handelIncommingAnswer(Platform, data, pcDbs) {
  const { answer, from } = data;

  const pc = pcDbs[from];

  if (!pc) {
    //console.warn("Peer connection not found for:", from);
    return;
  }

  if (pc.signalingState === 'have-local-offer') {
    console.log('here');
    pc.setRemoteDescription(new RTCSessionDescription(answer))
      .then(() => {
        if (pc.pendingIceCandidates) {
          pc.pendingIceCandidates.forEach(c =>
            pc.addIceCandidate(new RTCIceCandidate(c)).catch(console.error),
          );
          pc.pendingIceCandidates = [];
        }
      })
      .catch(err => {
        //   console.error("Failed to set remote description for answer:", err);
      });
  } else {
  }
}
