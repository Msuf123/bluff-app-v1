import { useAtom } from 'jotai';
import Home from './Components/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { backendUrlAtom, themeAtom } from './AppState/Atoms';
import ProfilePage from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import SignIn from './Components/Sign-In/SignIn';
import OtpScreen from './Components/OtpScreen/OtpScreen';
import PassInputFields from './Components/PasswordInputFields/PasswordInputFields';
import Toast from 'react-native-toast-message';
import Lobby from './Components/Lobby/Lobby';
import PlayArea from './Components/PlayArea/PlayArea';
import { useEffect, useState } from 'react';
import DeviceInfo, { usePowerState } from 'react-native-device-info';
import { lightTheme, powerSavingTheme } from './AppState/Theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UpdateWarning } from './Components/UpdateWarning/updateWarning';

const Stack = createNativeStackNavigator();
function App() {
  const [theme, setThemeAtom] = useAtom(themeAtom);

  const { lowPowerMode } = usePowerState();
  const styleTopBar = {
    headerTitleStyle: {
      color: theme?.colors?.textPrimary,
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: theme?.colors?.topBarNav,
    },
    headerTintColor: theme?.colors?.textPrimary,
  };

  const linking = {
    prefixes: ['bluffarena://'],
    config: {
      screens: {
        home: '',
        profile: 'profile',
        Lobby: 'Lobby',
        PlayTabel: 'PlayTabel',
        login: 'login',
        signIn: 'signIn',
        Otp: 'Otp',
        passSet: 'passSet',
      },
    },
  };
  useEffect(() => {
    if (lowPowerMode) {
      setThemeAtom(powerSavingTheme);
    } else {
      setThemeAtom(lightTheme);
    }
  }, [lowPowerMode]);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <StatusBar
            hidden={false}
            backgroundColor={theme?.colors?.topBarNav} // give it a solid color
            barStyle="dark-content" // or "light-content"
            translucent={false} // ← key prop for older behavior
          />
          <UpdateWarning></UpdateWarning>

          <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen
                name="home"
                component={Home}
                options={{
                  headerShown: false,
                  unmountOnBlur: true,
                }}
              />
              <Stack.Screen
                name="profile"
                component={ProfilePage}
                options={{
                  headerShown: false,
                  headerTitle: 'Account',
                  ...styleTopBar,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="login"
                component={Login}
                options={{
                  headerShown: false,
                  contentStyle: { marginBottom: 0 },
                  headerStyle: { display: 1, position: 'relative' },
                  animation: 'none',
                }}
              />
              <Stack.Screen
                name="Lobby"
                component={Lobby}
                options={{
                  headerShown: false,
                  ...styleTopBar,
                  // headerRight: () => <RightHeaderBarLobbyArea />,
                }}
              />
              <Stack.Screen
                name="PlayTabel"
                component={PlayArea}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="signIn"
                component={SignIn}
                options={{
                  headerShown: false,
                  title: 'Sign-Up',
                  ...styleTopBar,
                }}
              />
              <Stack.Screen
                name="Otp"
                component={OtpScreen}
                options={{
                  headerShown: false,
                  title: 'Sign-Up',
                  ...styleTopBar,
                }}
              />
              <Stack.Screen
                name="passSet"
                component={PassInputFields}
                options={{
                  headerShown: false,
                  title: 'Sign-Up',
                  ...styleTopBar,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

export default App;
