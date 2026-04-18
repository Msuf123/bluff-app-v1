import { useState } from "react";
import { authStateEmail, themeAtom } from "../../AppState/Atoms";
import { useRoute } from "@react-navigation/native";
import { useAtom } from "jotai";
import { StyleSheet, Text, View } from "react-native";
import CommonSignInButton from "../Sign-In/SubComponent/CommonSignInButton/CommonSignInButton";
import TextInputOtp from "./SubComponent/TextInputOtp/TextInputOtp";

export default function OtpScreen() {
  const [otps, setOtp] = useState("XXXX");
  const [email] = useAtom(authStateEmail);
  const url = useRoute();
  const [theme]=useAtom(themeAtom)
  return (
    <View style={[styles.container,{backgroundColor:theme?.colors?.background}]}>
      <Text style={[styles.heading,{color:theme?.colors?.textPrimary}]}>OTP sent to {email}</Text>
      <TextInputOtp otp={otps} setOtp={setOtp} />
      <CommonSignInButton
        emailId={email}
        otp={otps}
        pathToNav={"passSet"}
        url={"/auth/otp"}
        options={
          url.params
            ? url.params.type === "reset"
              ? { type: "reset" }
              : null
            : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});