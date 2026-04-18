import { useAtom } from "jotai";
import { authStateEmail, authStateOtp, themeAtom } from "../../AppState/Atoms";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import CommonSignInButton from "../Sign-In/SubComponent/CommonSignInButton/CommonSignInButton";

export default function PassInputFields() {
  const [email] = useAtom(authStateEmail);
  const [otp] = useAtom(authStateOtp);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [theme] = useAtom(themeAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(true);
  
  const url = useRoute();
  useEffect(() => {
    if (pass === pass2) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  }, [pass, pass2]);
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handlePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };
  return (
    <View style={[styles.container,{backgroundColor:theme.colors?.background}]}>
      <View
        style={[
          styles.passwordContainer,
          { marginBottom: 30 },
          {  marginTop: 25 },
          Platform.OS === "web" ? { minWidth: 150, maxWidth: "40%" } : {},
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
              position: "absolute",
              left: 0,
              right: 0,
            },
            passwordMatched ? {} : { borderColor: "red" },
          ]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={pass}
          onChangeText={setPass}
        />
        <TouchableOpacity
          style={[{ position: "absolute", right: 10, bottom: 0 }]}
          onPress={handlePasswordVisibility}
        >
          {showPassword ? (
            <EyeIcon color={theme?.colors?.textPrimary} />
          ) : (
            <EyeOffIcon color={theme?.colors?.textPrimary} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: "red", marginTop: 25 },
          Platform.OS === "web" ? { minWidth: 150, maxWidth: "40%" } : {},
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
              position: "absolute",
              left: 0,
              right: 0,
            },
            passwordMatched ? {} : { borderColor: "red" },
          ]}
          placeholder="Repeat Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword2}
          value={pass2}
          onChangeText={setPass2}
        />
        <TouchableOpacity
          style={[{ position: "absolute", right: 10, bottom: 0 }]}
          onPress={handlePasswordVisibility2}
        >
          {showPassword2 ? (
            <EyeIcon color={theme?.colors?.textPrimary} />
          ) : (
            <EyeOffIcon color={theme?.colors?.textPrimary} />
          )}
        </TouchableOpacity>
      </View>
      <CommonSignInButton
        pathToNav="home"
        otp={otp}
        password={pass}
        emailId={email}
        url={
          url.params
            ? url.params.type !== "reset"
              ? "/auth/uploadUser"
              : "/auth/reset"
            : "/auth/uploadUser"
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

    borderRadius: 8,

    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
