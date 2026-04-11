import { useAtom } from "jotai";
import { playerCardChooseOnGameTable, playerCardsArrayThatHeSelected, playersGameTableInfo, throwCardLabel, throwCardsButtonStatus, webScoket } from "../../../../../../../../AppState/Atoms";
import { useEffect, useRef } from "react";
import { useScreenDimensions } from "../../../../../../../../Hooks/useScreenDimensions";
import { Pressable, StyleSheet, View } from "react-native";
import ButtonCustom from "../../../../../../../SubComponents/ButtonCustom/ButtonCustom";

export default function NavButtonsThrowCardPopUp() {
  const [ws] = useAtom(webScoket);
  const [throwCard, setThrowCards] = useAtom(playerCardsArrayThatHeSelected);
  const [loading, setLoading] = useAtom(throwCardsButtonStatus);
  const [cardLabel] = useAtom(throwCardLabel);
  const [cardChooseS, setCardChoose] = useAtom(playerCardChooseOnGameTable);
  const [playerTableInfo, setPlayerTabelInfo] = useAtom(playersGameTableInfo);
  const payerLableRef = useRef(playersGameTableInfo);
  const playerLabelRefOfCardsWhenItsNotSet = useRef(cardLabel);
  const { width } = useScreenDimensions();
  useEffect(() => {
    payerLableRef.current = playerTableInfo.throwAreaCards.cardLable;
  }, [playerTableInfo]);
  useEffect(() => {
    playerLabelRefOfCardsWhenItsNotSet.current = cardLabel;
  }, [cardLabel]);

  function handelThrowCards() {
    if (!loading && throwCard.length !== 0) {
      if (payerLableRef.current && payerLableRef.current !== "Of") {
        ws.send(
          JSON.stringify({
            action: "throwCards",
            cards: throwCard,
            lable: payerLableRef.current,
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            action: "throwCards",
            cards: throwCard,
            lable: playerLabelRefOfCardsWhenItsNotSet.current,
          })
        );
      }
      setThrowCards([]);
      setLoading(true);
    }
  }
  return (
    <View
      style={[
        style.container,

        // <824 small horizontal padding
        width < 824 ? { paddingHorizontal: 5 } : {},

        // <552 → switch to vertical layout
        width < 552
          ? {
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }
          : {},
      ]}
    >
      <Pressable
        style={[
          style.imageContainer,

          width < 824 ? { paddingVertical: 5, paddingHorizontal: 8 } : {},
          width < 644 ? { paddingVertical: 4, paddingHorizontal: 6 } : {},

          width < 552
            ? {
                width: "100%", // FULL WIDTH
                maxWidth: 250, // OPTIONAL — same width for both
                alignItems: "center", // center icon in full-width button
                justifyContent: "center",
              }
            : {},
        ]}
        onPress={() => setCardChoose(false)}
      >
        <Image
          style={[
            style.imageStyle,
            width < 824 ? { width: 16, height: 16 } : {},
            width < 644 ? { width: 14, height: 14 } : {},
            width < 552 ? { width: 14, height: 14 } : {}, // slightly bigger for touch
          ]}
          source={require("./../../../../../../../../../assets/BackIconYellow.png")}
        />
      </Pressable>

      <ButtonCustom
        pressFun={handelThrowCards}
        divStyle={[
          style.divStyle,
          loading ? { backgroundColor: "#A5D6A7" } : {},

          width < 824
            ? { paddingVertical: 8, paddingHorizontal: 14, minWidth: 120 }
            : {},
          width < 644
            ? { paddingVertical: 6, paddingHorizontal: 10, minWidth: 100 }
            : {},

          // <552 → vertical layout = center + full-width button
          width < 552
            ? {
                minWidth: 100,
                alignSelf: "center",
                paddingVertical: 6,
                paddingHorizontal: 10,
              }
            : {},
        ]}
        textStyle={[
          style.textStyle,
          width < 824 ? { fontSize: 14 } : {},
          width < 644 ? { fontSize: 12 } : {},
          width < 552 ? { fontSize: 12 } : {}, // slightly bigger again for readability
        ]}
        heading={!loading ? "Throw Cards" : "Loading..."}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center", // ✅ corrected from invalid "start"
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  divStyle: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    minWidth: 150,

    ...(Platform.OS !== "web" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    }),
  },

  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  imageStyle: {
    width: 20,
    height: 20,
  },

  imageContainer: {
    borderColor: "#FFE221",
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    paddingVertical: 8,
    marginRight: 5,
  },
});