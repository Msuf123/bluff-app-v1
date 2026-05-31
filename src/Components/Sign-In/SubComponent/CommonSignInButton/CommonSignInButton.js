import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  authAtom,
  backendUrlAtom,
  themeAtom,
} from '../../../../AppState/Atoms';
import { useNavigation } from '@react-navigation/native';
import emailChecker from './emailChecker';
import fetchReq from '../../../Login/Functions/FetchReq';
import Toast from 'react-native-toast-message';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

export default function CommonSignInButton({
  emailId,
  pathToNav,
  url,
  otp,
  password,
  inputWidth,
  options,
}) {
  //update the code o include the  urls, singUpEmail, userAuth
  const [loadingState, setLoadingState] = useState(false);
  const [urls] = useAtom(backendUrlAtom);
  const [_, setAtuhState] = useAtom(authAtom);
  const nav = useNavigation();
  const [theme] = useAtom(themeAtom);
  function pressButton() {
    if (emailId !== '' && emailChecker(emailId)) {
      setLoadingState(true);
      let data = {};
      data.emailId = emailId;
      if (otp) {
        data.otp = otp;
      }
      if (password) {
        data.password = password;
      }

      fetchReq(urls, url, data).then(a => {
        setLoadingState(false);

        if (a === 'userThere') {
          Toast.show({
            type: 'info',
            text1: 'User already exists',
            text2: 'Try loggin in',
          });
          return;
        }

        if (a === 'invalidOtp') {
          setLoadingState(false);
          Toast.show({
            type: 'error',
            text1: 'The opt is invaild',
            text2: 'Try again',
          });
        }
        if (a === 'okay') {
          setLoadingState(false);
          if (pathToNav === 'Lobby') {
            setAtuhState(true);
            nav.navigate(pathToNav);
          } else {
            if (options) {
              nav.navigate(pathToNav, options);
            } else {
              nav.navigate(pathToNav);
            }
          }
        } else if (a === 'notOkay') {
          Toast.show({
            type: 'error',
            text1: 'Something went Wrong',
            text2: 'Try again later',
          });
        } else if (a === 'noUser' || a === 'userDoesNotExist') {
          Toast.show({
            type: 'error',
            text1: 'User does not exists',
            text2: 'Create account',
          });
        } else if (a === 'noPass') {
          Toast.show({
            type: 'info',
            text1: 'Password Incorrect',
            text2: 'Reset you password',
          });
        }
        setLoadingState(false);
      });
    }
  }
  return (
    <Pressable
      style={[
        style.button,
        { backgroundColor: theme.colors?.primary },
        { width: inputWidth ? inputWidth : '80%' },
        Platform.OS === 'web' ? { minWidth: 150, maxWidth: '40%' } : {},
      ]}
      onPressOut={pressButton}
    >
      {loadingState ? (
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Loaidng
        </Text>
      ) : (
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Next
        </Text>
      )}
    </Pressable>
  );
}
const style = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
});
