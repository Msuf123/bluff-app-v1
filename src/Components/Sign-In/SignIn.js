import { useState } from "react";
import { authStateEmail, themeAtom } from "../../AppState/Atoms";
import { useAtom } from "jotai";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput, View } from "react-native";
import CommonSignInButton from "./SubComponent/CommonSignInButton/CommonSignInButton";

export default function SignIn() {
  const [emailId, setEmailId] = useState("");
  const [email, setEmail] = useAtom(authStateEmail);
  const [validEmail, setValidEmail] = useState(true);
  const [theme]=useAtom(themeAtom)
  const nav = useNavigation();
  function handelChangeText(e) {
    setValidEmail(emailChecker(e));
    setEmailId(e);
    setEmail(e);
  }
  const { params } = useRoute();

  return (
    <View style={[style.div,{backgroundColor:theme.colors?.background}]}>
      <TextInput
        keyboardType="email-address"
        style={[
          style.input,{
              backgroundColor: theme?.colors?.inputBackground,
              borderColor: theme?.colors?.inputBorder,
              color: theme?.colors?.textPrimary,
            },
          validEmail ? {} : { borderColor: "red" },
          Platform.OS === "web"
            ? { minWidth: 150, maxWidth: "40%", outlineStyle: "none" }
            : {},
        ]}
        value={emailId}
        onChangeText={handelChangeText}
        placeholderTextColor="#888"
        placeholder="Enter email address"
      ></TextInput>
      <CommonSignInButton
        emailId={emailId}
        options={
          params ? (params.type === "reset" ? { type: "reset" } : null) : null
        }
        pathToNav={"Otp"}
        url={
          params
            ? params.type !== "reset"
              ? "/auth/createUser"
              : "/auth/changePassword"
            : "/auth/createUser"
        }
      ></CommonSignInButton>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
  },
});
