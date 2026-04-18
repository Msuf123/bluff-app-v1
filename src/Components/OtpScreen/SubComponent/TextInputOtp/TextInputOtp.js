import { useAtom } from "jotai";
import { authStateOtp, themeAtom } from "../../../../AppState/Atoms";
import { useRef } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

export default function TextInputOtp({ otp, setOtp }) {
  const [_, setAtuthStateOtps] = useAtom(authStateOtp);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [theme]=useAtom(themeAtom)
  const allInputs = [input1Ref, input2Ref, input3Ref, input4Ref];

  const moveFocus = (nextInputRef) => {
    nextInputRef?.current?.focus();
  };

  const handleChangeText = (value, index) => {
    if (value) {
      setOtps(value, setOtp, index, setAtuthStateOtps);
      if (index < allInputs.length - 1) {
        moveFocus(allInputs[index + 1]);
      }
    } else {
      setOtps("X", setOtp, index, setAtuthStateOtps);
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace") {
      // Only move back if current input is already empty
      if (otp[index] === "X" && index > 0) {
        setOtps("X", setOtp, index - 1, setAtuthStateOtps);
        moveFocus(allInputs[index - 1]);
      }
    }
  };

  return (
    <View
      style={[
        styles.otpContainer,
        Platform.OS === "web" ? { minWidth: 150, maxWidth: "40%" } : {},
      ]}
    >
      {allInputs.map((ref, i) => (
        <TextInput

          key={i}
          keyboardType="numeric"
          maxLength={1}
          ref={ref}
          value={otp[i] === "X" ? "" : otp[i]} // Optional: show empty instead of "X"
          onChangeText={(value) => handleChangeText(value, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          style={[
            styles.input,{ backgroundColor: theme?.colors?.inputBackground,
              borderColor: theme?.colors?.inputBorder,
              color: theme?.colors?.textPrimary,},
            Platform.OS === "web" ? { minWidth: 30, maxWidth: "40%" } : {},
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  input: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    borderColor: "black",
    borderWidth: 2,
    fontSize: 22,
    textAlign: "center",
    borderRadius: 8,
  },
});

function setOtps(inputKey, setOtp, replacePosition, setAtuthStateOtps) {
  const updateOtp = (original) => {
    return original
      .split("")
      .map((char, i) => (i === replacePosition ? inputKey : char))
      .join("");
  };

  setOtp(updateOtp);
  setAtuthStateOtps(updateOtp);
}
