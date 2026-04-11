import { StyleSheet, View } from "react-native";
import CardsSelect from "./SubComponents/CardsSelect/CardsSelect";
import NavBar from "./SubComponents/NavBar/NavBar";

export default function PlayerSelectCardsPopUp() {
  return (
    <View style={style.div}>
      <CardsSelect></CardsSelect>

      <NavBar></NavBar>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    backgroundColor: "rgba(1, 1, 1, 0.99)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
