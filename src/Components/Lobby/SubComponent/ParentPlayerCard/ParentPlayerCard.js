import { useAtom } from "jotai";
import { playerGameArea } from "../../../../AppState/Atoms";
import { FlatList, StyleSheet } from "react-native";
import PlayerCard from "./SubComponent/PlayerCard/PlayerCard";

export default function ParentPlayerCard() {
  const [roomDetails] = useAtom(playerGameArea);
  console.log(roomDetails.players, "ll");
  return (
    <FlatList
      style={style.div}
      data={roomDetails.players}
      contentContainerStyle={style.contnet}
      renderItem={(item) => (
        <PlayerCard
          email={item.item.email}
          name={item.item.name}
          url={item.item.image}
          readySataus={item.item.readyStatus}
        ></PlayerCard>
      )}
    ></FlatList>
  );
}
const style = StyleSheet.create({
  div: {
    width: "92%",
    margin: "auto",
    marginTop: 15,
    height: 100,
  },
  contnet: {
    display: "flex",
  },
});
