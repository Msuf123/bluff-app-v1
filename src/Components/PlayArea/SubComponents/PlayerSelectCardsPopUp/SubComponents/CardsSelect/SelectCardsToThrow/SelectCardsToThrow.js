import { StyleSheet, View } from "react-native";
import ImageCardWithState from "../ImageCardWithState/ImageCardWithState";
export default function SelectCardToThrow({ data, urls }) {
  return (
    <View style={[style.div, Platform.OS === "web" ? { height: 120 } : {}]}>
      {data.map((item, k) => {
        return (
          <ImageCardWithState
            cardName={item}
            index={k}
            url={urls + "/image/" + item.name}
            key={k}
          ></ImageCardWithState>
          
        );
      })}

    </View>
  );
}
const style = StyleSheet.create({
  div: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "",
    width: "100%",
    height: 100,
    margin: "auto",
    marginBottom: 10,
  },
});