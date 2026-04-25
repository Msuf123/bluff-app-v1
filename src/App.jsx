import { useAtom } from 'jotai';
import Home from './Components/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { themeAtom } from './AppState/Atoms';
import ProfilePage from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import SignIn from './Components/Sign-In/SignIn';
import OtpScreen from './Components/OtpScreen/OtpScreen';
import PassInputFields from './Components/PasswordInputFields/PasswordInputFields';
import Toast from 'react-native-toast-message';
import Lobby from './Components/Lobby/Lobby';
import PlayArea from './Components/PlayArea/PlayArea';
import { useEffect } from 'react';
import { usePowerState } from 'react-native-device-info';
import { lightTheme, powerSavingTheme } from './AppState/Theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
function App() {
  const [theme, setThemeAtom] = useAtom(themeAtom);

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
  const { lowPowerMode } = usePowerState();
  // const linking = {
  //     prefixes: ["bluffZone://", "http://localhost:8081"],
  //     config: {
  //         screens: {
  //             home: "",
  //             profile: "profile",
  //             Lobby: "Lobby",
  //             PlayTabel: "PlayTabel", // 👈 Define your path here
  //             login: "login",
  //             signIn: "signIn",
  //             Otp: "Otp",
  //             passSet: "passSet",
  //         },
  //     },
  // };
  useEffect(() => {
    if (lowPowerMode) {
      setThemeAtom(powerSavingTheme);
    } else {
      setThemeAtom(powerSavingTheme);
    }
  }, [lowPowerMode]);
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="PlayTabel">
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
      </SafeAreaProvider>
    </>
  );
}

export default App;
