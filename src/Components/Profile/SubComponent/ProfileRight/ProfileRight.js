import { useAtom } from "jotai";
import { themeAtom } from "../../../../AppState/Atoms";
import { Image, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileAccount from "./SubComponents/ProfileAccount/ProfileAccount";
import ProfileInfo from "./SubComponents/ProfileInfo/ProfileInfo";

export function ProfileRight() {
  const Tab = createBottomTabNavigator();
  const [theme] = useAtom(themeAtom);
  return (
    <View style={[style.div, Platform.OS !== "web" ? { width: "100%" } : {}]}>
      <Tab.Navigator
        initialRouteName="info"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme?.colors?.bottomBarActive,
          tabBarInactiveTintColor: theme?.colors?.bottomBarInActive,
          tabBarBackground: () => (
            <View
              style={{ flex: 1, backgroundColor: theme?.colors?.topBarNav }}
            />
          ),
        }}
      >
        <Tab.Screen
          name="info"
          component={ProfileInfo}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: () => (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={require("@/assets/user.png")}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="account"
          component={ProfileAccount}
          options={{
            title: "Account Settings",
            tabBarIcon: () => (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: 0.7,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={require("@/assets/settings.png")}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    width: "100%",

    borderRadius: 20,
    overflow: "hidden",
  },
});
