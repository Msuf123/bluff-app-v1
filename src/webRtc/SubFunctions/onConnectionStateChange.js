import Toast from 'react-native-toast-message';

export default function onConnectionStateChange(pc) {
  switch (pc.connectionState) {
    case 'new':
      Toast.show({ text1: 'new', type: 'info' });
      break;
    case 'connecting':
      Toast.show({ text1: 'Connecting', type: 'info' });
      break;
    case 'connected':
      Toast.show({ text1: 'connected', type: 'info' });
      break;
    case 'disconnected':
      console.warn('⚠️ Connection temporarily lost.');
      break;
    case 'failed':
      Toast.show({ text1: 'failed', type: 'info' });
      // You can trigger a reconnection or show a toast

      break;
    case 'closed':
      console.log('🔒 Connection closed.');
      break;
  }
}
