import { useNavigation } from '@react-navigation/native';
import {
  authStateEmail,
  backendUrlAtom,
} from '../../../../../../../AppState/Atoms';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useAtom } from 'jotai';
import fetchReq from '../../../../../../Login/Functions/FetchReq';
import { useState } from 'react';

export default function useResetPassword() {
  const nav = useNavigation();
  const [urls] = useAtom(backendUrlAtom);
  const [email, setEmail] = useAtom(authStateEmail);
  const [loading, setLoading] = useState(false);
  async function resetPass(params) {
    const url = `${urls}/auth/logedInReset`;
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
      setLoading(true);
      let a = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'include',
      })
        .then(a => a.json())
        .catch(() => null);

      if (a && a.hasOwnProperty('email')) {
        setEmail(a.email);
        let data = {};
        data.emailId = a.email;
        fetchReq(urls, '/auth/changePassword', data).then(res => {
          console.log('hello', res);
          if (res === 'okay') {
            nav.navigate('Otp', { type: 'reset' });
          }
          setLoading(false);
        });
      }
    } catch (e) {
      setLoading(false);
    }
  }
  return [resetPass, loading];
}
