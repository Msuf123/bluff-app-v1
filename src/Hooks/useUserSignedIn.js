import { useEffect, useState } from 'react';
import { authAtom, backendUrlAtom } from '../AppState/Atoms';
import { useAtom } from 'jotai';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import tokenVerification from '../Functions/tokenVerification';
export function useUserSignedIn() {
  const [loadingState, setLoadingState] = useState(true);
  const [urls] = useAtom(backendUrlAtom);
  const [auth, setAuthState] = useAtom(authAtom);
  const [authApp, setAuthApp] = useState(false);
  useEffect(() => {
    async function checkIfTokenThereOrNot() {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        try {
          const credentials = await Keychain.getGenericPassword();
          let tokenPresent = null;
          if (credentials) {
            tokenPresent = credentials.password; // assuming token is stored as password
            console.log('Token:', tokenPresent);
          } else {
            console.log('No credentials stored');
          }
          if (tokenPresent) {
            let userLoggedInStatus = await tokenVerification(
              urls + '/auth/verifyToken',
              Platform.OS,
              tokenPresent,
            );

            setAuthState(userLoggedInStatus);
            setAuthApp(userLoggedInStatus);
            setLoadingState(false);
          } else {
            setAuthState(false);
            setLoadingState(false);
          }
        } catch (e) {
          console.log(e);
        }
      }
      if (Platform.OS === 'web') {
        try {
          let userLoggedInStatus = await tokenVerification(
            urls + '/auth/verifyToken',
            Platform.OS,
          );

          setAuthApp(userLoggedInStatus);
          setAuthState(userLoggedInStatus);
          setLoadingState(false);
        } catch (e) {
          setLoadingState(false);
          setAuthState(false);
        }
      }
    }
    checkIfTokenThereOrNot();
  }, []);
  return [loadingState, authApp];
}
