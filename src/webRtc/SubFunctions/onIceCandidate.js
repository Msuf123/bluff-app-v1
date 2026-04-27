import Toast from 'react-native-toast-message';

export default function onIceCandidate(
  event,
  webSocket,
  yourEmail,
  email,
  data,
) {
  //when ever we get ice candidate form our service like google or twiilo we send to our signalling server
  try {
    if (event.candidate) {
      webSocket.send(
        JSON.stringify({
          action: 'ice-candidate',
          from: yourEmail,
          to: email,
          candidate: event.candidate,
          roomNumber: data.data.room,
        }),
      );
    }
  } catch (e) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: "Can't establishing voice communication",
    });
  }
}
