import { useAtom } from 'jotai';
import { authAtom, backendUrlAtom } from '../../../../../../../AppState/Atoms';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default function useLogoutUser() {
  const [, setAuth] = useAtom(authAtom);
  const [urls] = useAtom(backendUrlAtom);
  const nav = useNavigation();
  async function logout() {
    const url = `${urls}/auth/logOut`;

    const headers = {
      Platform: Platform.OS,
    };

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      let token = null;
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        token = credentials.password; // assuming token is stored as password
      } else {
      }
      if (token) {
        headers['Token'] = token;
      }
    }

    try {
      let a = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
      let resposne = await a.text();
      if (resposne === 'okay') {
        // Clear token from SecureStore if on mobile
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
          await Keychain.resetGenericPassword();
        }
        nav.navigate('home');
        // Clear auth state
        setAuth(false);
      }
    } catch (e) {}
  }

  return logout;
}
