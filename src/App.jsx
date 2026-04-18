
import { NewAppScreen } from '@react-native/new-app-screen';
import { useAtom } from 'jotai';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Home from './Components/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { themeAtom } from './AppState/Atoms';
import ProfilePage from './Components/Profile/Profile';
import Login from './Components/Login/Login';
const Stack = createNativeStackNavigator();
function App() {
    const [theme] = useAtom(themeAtom);
    const styleTopBar = {
        headerTitleStyle: {
            color: theme?.colors?.textPrimary,
            fontWeight: "bold",

        }, headerStyle: {
            backgroundColor: theme?.colors?.topBarNav,
        }, headerTintColor: theme?.colors?.textPrimary,

    }
    const linking = {
        prefixes: ["bluffZone://", "http://localhost:8081"],
        config: {
            screens: {
                home: "",
                profile: "profile",
                Lobby: "Lobby",
                PlayTabel: "PlayTabel", // 👈 Define your path here
                login: "login",
                signIn: "signIn",
                Otp: "Otp",
                passSet: "passSet",
            },
        },
    };

    return (

        <NavigationContainer linking={linking}  >
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={{
                        headerShown: false,
                        unmountOnBlur: true,

                    }}
                /><Stack.Screen
                    name="profile"
                    component={ProfilePage}
                    options={{ headerShown: false, headerTitle: "Account", ...styleTopBar }}
                ></Stack.Screen>
                <Stack.Screen
                    name="login"
                    component={Login}

                    options={{ headerShown: false, contentStyle: { marginBottom: 0 }, headerStyle: { display: 1, position: "relative" } }}
                /></Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;
