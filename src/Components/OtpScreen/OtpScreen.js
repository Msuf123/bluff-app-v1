import { useState } from 'react';
import { authStateEmail, themeAtom } from '../../AppState/Atoms';
import { useRoute } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { StyleSheet, Text, View } from 'react-native';
import CommonSignInButton from '../Sign-In/SubComponent/CommonSignInButton/CommonSignInButton';
import TextInputOtp from './SubComponent/TextInputOtp/TextInputOtp';

export default function OtpScreen() {
  const [otps, setOtp] = useState('XXXX');
  const [email] = useAtom(authStateEmail);
  const url = useRoute();
  const [theme] = useAtom(themeAtom);
  return (
    <View
      style={[styles.container, { backgroundColor: theme?.colors?.background }]}
    >
      <Text style={[styles.heading, { color: theme?.colors?.textPrimary }]}>
        OTP sent to {email}
      </Text>
      <Text
        style={[
          styles.notice,
          { color: theme?.colors?.textSecondary ?? '#888' },
        ]}
      >
        ⏳ It may take a few minutes to arrive. Please do not refresh the page.
      </Text>
      <TextInputOtp otp={otps} setOtp={setOtp} />
      <CommonSignInButton
        emailId={email}
        otp={otps}
        pathToNav={'passSet'}
        url={'/auth/otp'}
        options={
          url.params
            ? url.params.type === 'reset'
              ? { type: 'reset' }
              : null
            : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  notice: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});
