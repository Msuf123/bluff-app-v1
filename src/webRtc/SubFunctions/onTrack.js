import { Platform } from 'react-native';
import inCallManager from 'react-native-incall-manager';

export default function onTrack(event, audioElement, setRemoteStream) {
  console.log('🎧 Remote track received:', event);

  const remoteStream = event.streams[0];

  if (Platform.OS === 'web') {
    // --- 🕸️ WEB ---
    if (audioElement) {
      // If you already passed an <audio> element
      audioElement.srcObject = remoteStream;
    } else {
      // Otherwise create one dynamically
      const newAudio = document.createElement('audio');
      newAudio.srcObject = remoteStream;
      newAudio.autoplay = true;
      newAudio.playsInline = true;
      document.body.appendChild(newAudio);
    }
  } else {
    try {
      if (typeof setRemoteStream === 'function') {
        setRemoteStream(remoteStream);
      }
      inCallManager.start({ media: 'audio' });
      inCallManager.setForceSpeakerphoneOn(true);
    } catch (e) {
      console.log('Error setting up speaker in andorid', e);
    }
  }
}
