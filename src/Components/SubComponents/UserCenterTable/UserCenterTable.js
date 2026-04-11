import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import { animationDbs, playersGameTableInfo } from "../../../AppState/Atoms";
import { useScreenDimensions } from "../../../Hooks/useScreenDimensions";

export default function UserCenterTable({ display }) {
  const centerTable = useRef();
  const { width, height } = useScreenDimensions();
  const [playerTable] = useAtom(playersGameTableInfo);

  const [_, setCenterTablePostion] = useAtom(animationDbs);
  useEffect(() => {
    setCenterTablePostion((org) => ({ ...org, table: centerTable.current }));
  }, []);
  const totalCards = playerTable?.throwAreaCards?.totalNumberOfCards || 0;

  const cardsArray = Array.from({ length: totalCards }, (_, index) => index);

  // Fan configuration
  const maxAngle = 60; // total degrees of the fan (e.g. -30 to +30)
  const centerAngle = 0; // straight up
  const angleStep = totalCards > 1 ? maxAngle / (totalCards - 1) : 0;

  return (
    <View
      style={[
        styles.playersDiv,
        width < 646 ? { width: 70, height: 70 } : {},
        width < 496 ? { width: 50, height: 50 } : {},
        width < 344 ? { width: 30, height: 30 } : {},
      ]}
      ref={centerTable}
    >
      {cardsArray.map((_, index) => {
        const angle = -maxAngle / 2 + index * angleStep;

        return (
          <Image
            key={index}
            resizeMode="contain"
            source={require("@/assets/A.png")}
            style={[
              styles.cardImage,
              {
                transform: [
                  { rotate: `${angle}deg` },
                  { translateY: -20 }, // Slight upward offset to mimic fan
                ],
              },
              width > 980 ? { width: 100, height: 100 } : {},
              width < 491 ? { width: 70, height: 70 } : {},
              width < 496 ? { width: 50, height: 50 } : {},
              width < 344 ? { width: 30, height: 30 } : {},
            ]}
          />
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  cardImage: {
    position: "absolute",
    width: 50,
    height: 70,
    top: "50%",
    transform: [{ translateY: "0%" }],
    borderRadius: 5,

    backgroundColor: "transparent",
  },
  playersDiv: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
