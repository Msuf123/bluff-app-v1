import { useAtom } from "jotai";
import { authAtom, backendUrlAtom } from "../../../../../../../AppState/Atoms";
import { Platform } from "react-native";
 import * as Keychain from 'react-native-keychain';

export default function useDeleteUser() {
  const [, setAuth] = useAtom(authAtom);
  const [urls] = useAtom(backendUrlAtom);

  async function deleteUser() {
    const url = `${urls}/auth/deleteAccount`;
    const headers = {
      Platform: Platform.OS,
    };

    try {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        let token =null
        const credentials = await Keychain.getGenericPassword();

if (credentials) {
   token = credentials.password; 
  console.log('Token:', token);
} else {
  console.log('No credentials stored');
}
        if (token) {
          headers["Token"] = token;
        }
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Failed to delete user:", response.status);
        return false;
      }

      // Clear token & auth state
      if (Platform.OS === "android" || Platform.OS === "ios") {
        await Keychain.resetGenericPassword();
      }

      setAuth(false);
      return true;
    } catch (error) {
      console.error("Delete user error:", error);
      return false;
    }
  }

  return deleteUser;
}
