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
      return;
    }
    if (
      pc.signalingState === 'closed' ||
      pc.connectionState === 'closed' ||
      pc.connectionState === 'failed'
    ) {
      console.warn(
        `⚠️ Dropping ICE candidate from ${from} — connection is ${pc.connectionState}`,
      );
      return;
    }
    if (pc.remoteDescription) {
      pc.addIceCandidate(new RTCIceCandidate(ice)).catch(err => {
        console.error('Failed to add ICE candidate:', err);
      });
    } else {
      if (!pc.pendingIceCandidates) {
        pc.pendingIceCandidates = [];
      }
      pc.pendingIceCandidates.push(ice);
    }
  } else {
    const { ice } = data.data;
    const from = data.from;
    if (!from) {
      return;
    }

    const pc = pcDbs[from];

    if (
      !pc ||
      pc.signalingState === 'closed' ||
      pc.connectionState === 'closed' ||
      pc.connectionState === 'failed'
    ) {
      return;
    }

    if (pc.remoteDescription) {
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
