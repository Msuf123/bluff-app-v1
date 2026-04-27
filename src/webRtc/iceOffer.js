import { RTCIceCandidate } from 'react-native-webrtc';

export default function handelIcesOffer(Platform, data, pcDbs) {
  if (Platform.OS === 'web') {
    console.log('Reving ice offer');
    const { ice } = data.data;
    const from = data.from;
    if (!from) {
      return;
    }

    const pc = pcDbs[from];

    if (!pc) {
      //  console.warn("Peer connection not found for ICE candidate from:", from);
      return;
    }

    if (pc.remoteDescription) {
      // console.log("Adding ICE candidate for", from);
      pc.addIceCandidate(new RTCIceCandidate(ice)).catch(err => {
        console.error('Failed to add ICE candidate:', err);
      });
    } else {
      //  console.warn(
      //    "Remote description not set yet, queuing ICE candidate for",
      //    from
      //   );
      // Store ICE candidates if remote description isn't set yet
      if (!pc.pendingIceCandidates) {
        pc.pendingIceCandidates = [];
      }
      pc.pendingIceCandidates.push(ice);
    }
  } else {
    // console.log("Received ICE candidate from:", data.from);
    const { ice } = data.data;
    const from = data.from;
    if (!from) {
      // console.error("ICE candidate received without 'from' field:", data);
      return;
    }

    const pc = pcDbs[from];

    if (!pc) {
      //  console.warn("Peer connection not found for ICE candidate from:", from);
      return;
    }

    if (pc.remoteDescription) {
      //  console.log("Adding ICE candidate for", from);
      pc.addIceCandidate(new RTCIceCandidate(ice)).catch(err => {
        console.error('Failed to add ICE candidate:', err);
      });
    } else {
      //   console.warn(
      //     "Remote description not set yet, queuing ICE candidate for",
      //     from
      // );
      // Store ICE candidates if remote description isn't set yet
      if (!pc.pendingIceCandidates) {
        pc.pendingIceCandidates = [];
      }
      pc.pendingIceCandidates.push(ice);
    }
  }
}
