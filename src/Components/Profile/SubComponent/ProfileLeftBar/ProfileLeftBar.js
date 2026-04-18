import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PorfileLeftBar() {
  const nav = useNavigation();

  return (
    <View style={styles.div}>
      <Pressable
        style={styles.pressables}
        onPressOut={() => {
          nav.navigate("profile", {
            screen: "info",
          });
        }}
      >
        <Text style={styles.text}>Info</Text>
      </Pressable>
      <Pressable
        style={styles.pressables}
        onPressOut={() => {
          nav.navigate("profile", {
            screen: "account", // Tell the nested navigator which tab to show
          });
        }}
      >
        <Text style={styles.text}>Account</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  div: {
    backgroundColor: "transparent",
    width: "30%",
    height: "100%",
  },
  pressables: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  text: { fontSize: 20 },
});
