import { useAtom } from "jotai";
import { useScreenDimensions } from "../../../../../../../../Hooks/useScreenDimensions";
import { playerCardsArrayThatHeSelected } from "../../../../../../../../AppState/Atoms";
import { StyleSheet, Text, View } from "react-native";

export default function NumberOfSelectedCards() {
  const { width } = useScreenDimensions();
  const [numberOfSelectedCards] = useAtom(playerCardsArrayThatHeSelected);

  return (
    <View style={style.div}>
      <Text
        style={[
          style.text,

          width < 824 ? { fontSize: 16 } : {}, // first shrink
          width < 644 ? { fontSize: 15 } : {}, // more shrink
          width < 552 ? { fontSize: 13 } : {}, // slight bump for readability
        ]}
      >
        Selected Cards:{" "}
        {numberOfSelectedCards ? numberOfSelectedCards.length : null}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  div: {},
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
