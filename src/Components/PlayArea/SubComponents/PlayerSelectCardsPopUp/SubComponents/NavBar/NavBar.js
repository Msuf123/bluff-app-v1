import { useAtom } from "jotai";
import { playerCardsArrayThatHeSelected, playersGameTableInfo, throwCardLabel } from "../../../../../../AppState/Atoms";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import NumberOfSelectedCards from "./SubComponent/NumberOfSelectedCards/NumberOfSelectedCards";
import DropDownSelector from "./SubComponent/DropDownSelector/DropDownSelector";
import NavButtonsThrowCardPopUp from "./SubComponent/NavButtonsThrowCardsPopUp/NavButtonsThrowCardsPopUp";

export default function NavBar() {
  const [playerArea, setPlayerArea] = useAtom(playersGameTableInfo);
  const [cardLabel, setCardLabel] = useAtom(throwCardLabel);
  const [numberOfSelectedCards] = useAtom(playerCardsArrayThatHeSelected);
  const numberOfCards = useRef(null);
  const cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  function setScoreBoardLable(value) {
    setCardLabel(numberOfCards.current + "Of" + value);
  }
  useEffect(() => {
    numberOfCards.current = numberOfSelectedCards.length;
  }, [numberOfSelectedCards]);

  return (
    <View style={style.div}>
      <NumberOfSelectedCards></NumberOfSelectedCards>
      {playerArea.throwAreaCards.totalNumberOfCards === 0 ? (
        <>
          <DropDownSelector
            options={cardValues}
            text={"Lable them as:"}
            heightOfDropDown={120}
            onChangeFunction={setScoreBoardLable}
          ></DropDownSelector>
        </>
      ) : null}
      <NavButtonsThrowCardPopUp></NavButtonsThrowCardPopUp>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    width: "30%",
    height: "100%",
    backgroundColor: "",
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "space-between",
  },
});