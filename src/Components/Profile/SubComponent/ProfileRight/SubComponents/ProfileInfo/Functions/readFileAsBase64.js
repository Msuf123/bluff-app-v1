import { Platform } from "react-native";
import * as Keychain from "react-native-keychain";
import Toast from "react-native-toast-message";

// Unified function to read file contents as base64
export const readFileAsBase64 = async (uri) => {
  if (Platform.OS === "web") {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } else {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
};
const CHUNK_SIZE = 100000; // 100 KB per chunk (tweak as needed)

const splitBase64IntoChunks = (base64Str) => {
  const chunks = [];
  for (let i = 0; i < base64Str.length; i += CHUNK_SIZE) {
    chunks.push(base64Str.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
};
export const uploadChunks = async (
  base64String,
  fileName,
  setStatus,
  setOriginalImageUrlState,
  originalImageUrl,
  backendUrl,
) => {
  const chunks = splitBase64IntoChunks(base64String);
  const uploadId = Date.now().toString();
  const totalChunks = chunks.length;

  for (let i = 0; i < totalChunks; i++) {
    const chunkData = {
      chunk: chunks[i],
      index: i,
      totalChunks,
      fileName,
      uploadId,
    };

    let result;
    try {
      let tokens = null;
      if (Platform.OS !== "web") {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          tokens = credentials.password; // assuming token is stored as password
          console.log("Token:", tokens);
        } else {
          console.log("No credentials stored");
        }
      }
      const response = await fetch(backendUrl + "/image/upload-chunk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Platform: Platform.OS,
          ...(Platform.OS !== "web" ? { Token: tokens } : {}),
        },
        credentials: "include",
        body: JSON.stringify(chunkData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      result = await response.json();
    } catch (error) {
      console.log("Upload failed:", error);
      result = { success: false }; // Fallback response
    }

    // Handle result safely now
    if (result.hasOwnProperty("success") && result["success"] === false) {
      setStatus(0);
      console.log(originalImageUrl);
      setOriginalImageUrlState(originalImageUrl);
      Toast.show({
        text1: "Error",
        text2: "Error Uploading Image",
        type: "error",
      });
    } else if (result.hasOwnProperty("cloudinaryUrl")) {
      setOriginalImageUrlState(result["cloudinaryUrl"]);
      setStatus(0);
    } else {
      setStatus(((i + 1) / totalChunks) * 100);
    }

    console.log(`Uploaded chunk ${i + 1}/${totalChunks}`, result);
  }
};
