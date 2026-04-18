import { useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useDeleteUser from "./Functions/useDeleteUser";
import { themeAtom } from "../../../../../../AppState/Atoms";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import useLogoutUser from "./Functions/useUserLogout";

export default function ProfileAccount() {
  const navigation = useNavigation();
  const logout = useLogoutUser(navigation);
  const [theme] = useAtom(themeAtom);
  const deleted = useDeleteUser();

  useEffect(() => {
    if (Platform.OS !== "web") {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors?.background }]}>
      

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors?.primary }]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "rgba(143, 34, 34, 1)", marginTop: 16 }]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={[styles.buttonOutline, { borderColor: "rgba(143, 34, 34, 1)" }]}
        onPress={deleted}
      >
        <Text style={[styles.buttonText, { color: "rgba(143, 34, 34, 1)" }]}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 28,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 0,
  },
  buttonOutline: {
    borderRadius: 10,
    borderWidth: 1.5,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
});