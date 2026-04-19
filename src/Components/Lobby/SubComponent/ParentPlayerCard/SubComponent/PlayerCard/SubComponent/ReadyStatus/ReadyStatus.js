import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function ReadySatus({ boolVal }) {
  let color = "red";
  if (boolVal) {
    color = "rgb(70, 255, 67)";
  }
  useEffect(() => {
    //   console.log("state cahnged of bool val",boolVal)
  }, [boolVal]);
  return <View style={[style.div, { backgroundColor: color }]}></View>;
}
const style = StyleSheet.create({
  div: {
    width: 12,
    height: 12,
    borderRadius: 12,

    marginLeft: 15,
  },
});
