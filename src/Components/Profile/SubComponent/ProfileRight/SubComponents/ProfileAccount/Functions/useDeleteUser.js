import { useAtom } from 'jotai';
import { authAtom, backendUrlAtom } from '../../../../../../../AppState/Atoms';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';

export default function useDeleteUser() {
  const [, setAuth] = useAtom(authAtom);
  const [urls] = useAtom(backendUrlAtom);
  const nav = useNavigation();
  async function deleteUser() {
    const url = `${urls}/auth/deleteAccount`;
    const headers = {
      Platform: Platform.OS,
    };

    try {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        let token = null;
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          token = credentials.password;
        } else {
        }
        if (token) {
          headers['Token'] = token;
        }
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        return false;
      }

      // Clear token & auth state
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        await Keychain.resetGenericPassword();
        nav.navigate('home');
      }

      setAuth(false);
    } catch (error) {
      console.error('Delete user error:', error);
    }
  }

  return deleteUser;
}
