import Toast from 'react-native-toast-message';

export default function onIceStateChange(pc) {
  if (pc.iceConnectionState === 'failed') {
    Toast.show({
      type: 'error',
      text1: 'Error establishing voice communication',
    });
  }
  if (pc.iceConnectionState === 'connected') {
    //console.log("✅ Peer connection established.");
  }
  if (pc.iceConnectionState === 'closed') {
    //console.log("the peero has left the voice chat", email);
  }
}
