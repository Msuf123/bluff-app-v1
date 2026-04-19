import { useAtom } from "jotai";
import { playerGameArea, themeAtom } from "../../../../AppState/Atoms";
import { StyleSheet, Text, View } from "react-native";

export default function RoomInfo() {
  const [roomDetails] = useAtom(playerGameArea);
  const [theme] = useAtom(themeAtom);
  return (
    <View style={[style.div, { backgroundColor: theme?.colors?.background }]}>
      <Text style={[style.text, { color: theme?.colors?.textPrimary }]}>
        Room number: {roomDetails ? roomDetails.room : null}
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    backgroundColor: "white",
    width: "90%",
    margin: "auto",
    height: 50,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 5,
    boxShadow: "0 0 13 1 rgba(49, 49, 49, 0.1)",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
});
