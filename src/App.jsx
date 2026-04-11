
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
const Stack = createNativeStackNavigator();
function AppStack() {
    const [theme] = useAtom(themeAtom);
    const styleTopBar = {
        headerTitleStyle: {
            color: theme?.colors?.textPrimary,
            fontWeight: "bold",
        }, headerStyle: {
            backgroundColor: theme?.colors?.topBarNav,
        }, headerTintColor: theme?.colors?.textPrimary
    }
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                }}
            /></Stack.Navigator>
    )
}
function MainApp() {
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
        <NavigationContainer linking={linking}>
            <AppStack />
        </NavigationContainer>
    );
}
function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <MainApp></MainApp>
        </SafeAreaProvider>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
