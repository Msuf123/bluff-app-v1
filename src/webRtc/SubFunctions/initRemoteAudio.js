import { Platform } from "react-native";

export function initRemoteAudio(setAudio) {
  if (Platform.OS === "web") {
    const audioEl = document.createElement("audio");
    audioEl.autoplay = true;
    document.body.appendChild(audioEl);
    setAudio(audioEl);
  } else {
    const { MediaStream } = require("react-native-webrtc");
    // For mobile, just set a placeholder MediaStream object
    // The actual stream will be received via ontrack in your WebRTC connection
    setAudio(new MediaStream());
  }
}
