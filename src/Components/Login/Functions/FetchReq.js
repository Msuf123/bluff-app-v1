import * as Keychain from 'react-native-keychain';
import { Platform } from "react-native";
export default async function fetchReq(parentUrl, url, data) {
  return fetch(parentUrl + url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Platform: Platform.OS },
    credentials: "include", 
    body: JSON.stringify(data),
  })
    .then(async(a) => {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        if (a.status == 203) {
          let token = a.headers.get("Token");

          if (token) {
            await Keychain.setGenericPassword("user",token);
          }
        }
      }
      return a.text();
    })
    .catch((a) => {
      return false;
    });
}