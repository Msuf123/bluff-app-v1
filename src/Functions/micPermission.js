import { Linking, Platform } from "react-native";
import Toast from "react-native-toast-message";

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
    if (Platform.OS === "web") {
      mic = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } else {
      const { mediaDevices } = require("react-native-webrtc");
      mic = mediaDevices.getUserMedia({ audio: true });
    }
    mic
      .then((res) => {
        setMicStateGolbalPermission(true);
        res.getAudioTracks().forEach((track) => {
          track.enabled = true;
        });
        if (deniedMicState) {
          setDeniedMicState(false);
          if (createOffer) {
            console.log("Calling call offer");
            createOffer();
          } else {
            console.log("NO funciton given like create offer");
          }
        }
        setMicMediaStreamState(res);
      })
      .catch((err) => {
        setMicStateGolbalPermission(false);
        setDeniedMicState(true);
        if (
          Platform.OS === "android" &&
          numberOfTimeGolobalPermissionClickedState !== 0
        ) {
          setNumberOfTimeGolobalPermissionClicked(0);
          Linking.openSettings();
        } else if (
          Platform.OS === "ios" &&
          numberOfTimeGolobalPermissionClickedState !== 0
        ) {
          setNumberOfTimeGolobalPermissionClicked(0);
          Linking.openURL("app-settings:"); // Opens app settings on iOS
        }
        Toast.show({
          text1: "Voice Chat Off",
          text2: "Enable mic to have voice chat",
          type: "info",
        });
      });

    if (Platform.OS === "web") {
      //Here added a listen that will tell if the user has revekd permssion or not
      navigator.permissions.query({ name: "microphone" }).then((obj) => {
        obj.onchange = () => {
          if (obj.state === "prompt" || obj.state === "denied") {
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
