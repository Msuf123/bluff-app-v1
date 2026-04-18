import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ProgressDot({ status }) {
  const [loadingState, setLoadingState] = useState(status);
  return (
    <View
      style={[
        style.div,
        status === "error" ? { backgroundColor: "red" } : {},
        status === "processing" ? { backgroundColor: "yellow" } : {},
        status === "success" ? { backgroundColor: "green" } : {},
        status === "hide" ? { backgroundColor: "transparent" } : {},
      ]}
    ></View>
  );
}
const style = StyleSheet.create({
  div: {
    backgroundColor: "red",
    width: 15,
    height: 15,
    borderRadius: "50%",
  },
});
