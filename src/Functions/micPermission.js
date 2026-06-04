import { Linking, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export default function MicPermission(
  micStateGlobalPermission,
  setMicStateGolbalPermission,
  numberOfTimeGolobalPermissionClickedState,
  setNumberOfTimeGolobalPermissionClicked,
  micStates,
  setMicState,
  setMicMediaStreamState,
  micMediaStreamState,
  deniedMicState,
  setDeniedMicState,
  createOffer,
) {
  if (!micStateGlobalPermission) {
    let mic = null;
    if (Platform.OS === 'web') {
      mic = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } else {
      const { mediaDevices } = require('react-native-webrtc');
      mic = mediaDevices.getUserMedia({ audio: true, video: false });
    }
    mic
      .then(res => {
        setMicStateGolbalPermission(true);

        res.getAudioTracks().forEach(track => {
          track.enabled = true;
        });
        setMicMediaStreamState(res);
        if (deniedMicState) {
          setDeniedMicState(false);
          if (createOffer) {
            createOffer();
          } else {
          }
        } else {
          //Run this even if user didn't denies meaing the mic pop was late and conneciotn was not there of mic

          if (createOffer) {
            createOffer();
          }
        }
        setMicState(true);
      })
      .catch(err => {
        setMicStateGolbalPermission(false);
        setDeniedMicState(true);
        setMicState(false);
        if (
          Platform.OS === 'android' &&
          numberOfTimeGolobalPermissionClickedState !== 0
        ) {
          setNumberOfTimeGolobalPermissionClicked(0);
          Linking.openSettings();
        } else if (
          Platform.OS === 'ios' &&
          numberOfTimeGolobalPermissionClickedState !== 0
        ) {
          setNumberOfTimeGolobalPermissionClicked(0);
          Linking.openURL('app-settings:'); // Opens app settings on iOS
        }
        Toast.show({
          text1: 'Voice Chat Off',
          text2: 'Enable mic to have voice chat',
          type: 'info',
        });
      });

    if (Platform.OS === 'web') {
      //Here added a listen that will tell if the user has revekd permssion or not
      navigator.permissions.query({ name: 'microphone' }).then(obj => {
        obj.onchange = () => {
          if (obj.state === 'prompt' || obj.state === 'denied') {
            setMicStateGolbalPermission(false);
          }
        };
      });
    }
  } else {
    //This is case where permission is given we only need to mukte and unmtue the audio
    if (micStates) {
      setMicState(false);

      micMediaStreamState.getAudioTracks()[0].enabled = false;
    } else {
      setMicState(true);
      micMediaStreamState.getAudioTracks()[0].enabled = true;
    }
  }
}
