import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { playerCardsArrayThatHeSelected } from "../../../../../../../AppState/Atoms";
import { useScreenDimensions } from "../../../../../../../Hooks/useScreenDimensions";
import { Image, PanResponder, StyleSheet, View } from "react-native";

export default function ImageCardWithState({ url, index, cardName }) {
  const [clicked, setClicked] = useState(false);
  const [userSelectedCards, setUserSelectedCards] = useAtom(
    playerCardsArrayThatHeSelected
  );
  const { width } = useScreenDimensions();
  let dyValue = 0;
  const pan = useRef(false);
  let fiveHundredMiliSecondTimesItRan = 0;

  function handleSelect() {
    if (!clicked) {
      setUserSelectedCards((prev) => {
        const cardExists = prev.some(
          (item) => JSON.stringify(item) === JSON.stringify(cardName)
        );
        if (cardExists) return prev;
        return [...prev, cardName];
      });
    } else {
      setUserSelectedCards((prev) =>
        prev.filter((item) => JSON.stringify(item) !== JSON.stringify(cardName))
      );
    }

    setClicked((org) => !org);
  }

  function trackTheUserMovement() {
    const id = setInterval(() => {
      let dy = dyValue;

      if (fiveHundredMiliSecondTimesItRan > 2) {
        clearInterval(id);
        setTimeout(() => {
          fiveHundredMiliSecondTimesItRan = 0;
        }, 1000);
      } else if (fiveHundredMiliSecondTimesItRan === 2) {
        if (dy < 3 && dy > -3) {
          handleSelect(); // Use shared handler
        }
      }
      fiveHundredMiliSecondTimesItRan += 1;
    }, 150);
  }

  const pans = PanResponder.create({
    onPanResponderReject: () => {},
    onPanResponderTerminate: () => {},
    onPanResponderRelease: () => {},
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const { dx, dy } = gestureState;
      trackTheUserMovement();
      dyValue = dy;
      return pan.current;
    },
    onPanResponderMove: (e, gestureState) => {},
  });

  return (
    <View
      style={[style.div, clicked ? style.clicked : {}]}
      {...pans.panHandlers}
      {...(Platform.OS === "web" ? { onClick: handleSelect } : {})} // 👈 Handle web click
    >
      <Image
        style={[
          style.img,
          width > 980
            ? {
                width: 100,
                height: 100,
              }
            : { width: 80, height: 80 },
        ]}
        resizeMode="contain"
        source={{ uri: url }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  div: {
    width: 100,
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: "transparent",
    marginTop: 0,
    borderWidth: 1,
  },
  img: {
    width: 70,
    height: 70,
  },
  clicked: {
    borderColor: "green",
    borderWidth: 1,
  },
});
