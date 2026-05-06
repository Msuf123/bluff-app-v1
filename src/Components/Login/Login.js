import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { authAtom, backendUrlAtom, themeAtom } from '../../AppState/Atoms';
import { useAtom } from 'jotai';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';
import { authenticateUsers } from './Functions/authenticateUsers';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';

export default function Login() {
  const nav = useNavigation();
  const [emailId, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [url] = useAtom(backendUrlAtom);
  const [theme] = useAtom(themeAtom);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAtom(authAtom);
  const [opacity, setOpacity] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        Orientation.lockToPortrait();
      }, 100); // 👈 important

      return () => {
        clearTimeout(timer);
        Orientation.unlockAllOrientations();
      };
    }, []),
  );
  const handlePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handelSubmitCredentials = async () => {
    if (emailId.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Enter a valid email',
        text2: "EmailId can't be empty",
      });
      return;
    }
    if (pass.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Enter a valid password',
        text2: "Password can't be empty",
      });
      return;
    }

    setLoading(true);
    const res = await authenticateUsers(url, '/auth/login', {
      emailId,
      password: pass,
    });

    if (res === 'noPass' || res === 'noUser') {
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
        text2: 'Try again!',
      });
      setOpacity(1);
      setTimeout(() => {
        setOpacity(0);
      }, 6000);
    } else if (res === 'okay') {
      setAuth(true);
      nav.navigate('home');
    }

    setLoading(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme?.colors?.background }]}
    >
      <Text style={[styles.title, { color: theme?.colors?.textPrimary }]}>
        Login
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme?.colors?.inputBackground,
            borderColor: theme?.colors?.inputBorder,
            color: theme?.colors?.textPrimary,
          },
          Platform.OS === 'web' ? { minWidth: 150, maxWidth: '40%' } : {},
        ]}
        placeholder="Email"
        placeholderTextColor="#888"
        value={emailId}
        onChangeText={setEmail}
      />

      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: 'red', marginTop: 25 },
          Platform.OS === 'web' ? { minWidth: 150, maxWidth: '40%' } : {},
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              flex: 1,
              backgroundColor: theme?.colors?.inputBackground,
              borderColor: theme?.colors?.inputBorder,
              color: theme?.colors?.textPrimary,
            },
            {
              position: 'absolute',
              left: 0,
              right: 0,
            },
          ]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={pass}
          onChangeText={setPass}
        />
        <TouchableOpacity
          style={[{ position: 'absolute', right: 10, bottom: 0 }]}
          onPress={handlePasswordVisibility}
        >
          {showPassword ? (
            <EyeIcon color={theme?.colors?.textPrimary} />
          ) : (
            <EyeOffIcon color={theme?.colors?.textPrimary} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.passwordContainer,
          { marginTop: 5, marginBottom: 5 },
          Platform.OS === 'web' ? { minWidth: 150, maxWidth: '40%' } : {},
        ]}
        onPress={() => {
          if (opacity !== 0) {
            nav.navigate('signIn', { type: 'reset' });
          }
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: 'red',
            textDecorationLine: 'underline',
            display: opacity == 0 ? 'none' : 'flex',
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors?.primary,
            marginTop: opacity == 0 ? 15 : 0,
          },
          Platform.OS === 'web'
            ? { minWidth: 150, maxWidth: '40%', marginTop: 0 }
            : {},
        ]}
        onPress={handelSubmitCredentials}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          nav.navigate('signIn');
        }}
      >
        <Text
          style={[styles.signUpText, { color: theme?.colors?.textPrimary }]}
        >
          Don't have an account?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

    borderRadius: 8,

    marginBottom: 0,
  },
  button: {
    width: '100%',

    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 16,
  },
});
