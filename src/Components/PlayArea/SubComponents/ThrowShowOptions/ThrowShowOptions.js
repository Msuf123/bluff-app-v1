import { useAtom } from "jotai";
import { playerCardChooseOnGameTable, webScoket } from "../../../../AppState/Atoms";
import { StyleSheet, View } from "react-native";
import ButtonCustom from "../../../SubComponents/ButtonCustom/ButtonCustom";

export default function ThrowShowOptions({ disabled }) {
  const [cardChooseS, setCardChoose] = useAtom(playerCardChooseOnGameTable);
  const [ws] = useAtom(webScoket);
  function throwCards() {
    setCardChoose(true);
  }
  return (
    <View style={[style.div]}>
      <ButtonCustom
        heading={"Thow"}
        pressFun={throwCards}
        textStyle={[style.textStyle, style.textOne]}
        divStyle={[style.buttons, style.buttonOne]}
      ></ButtonCustom>
      <ButtonCustom
        heading={"Show"}
        textStyle={[
          style.textStyle,
          style.textTwo,
          disabled ? style.disabledTwoText : null,
        ]}
        divStyle={[
          style.buttons,
          style.buttonTwo,
          disabled ? style.disabledTwo : null,
        ]}
        pressFun={() => {
          ws.send(JSON.stringify({ action: "showCards" }));
        }}
      ></ButtonCustom>
      <ButtonCustom
        heading={"Pass"}
        textStyle={[
          style.textStyle,
          style.textThree,
          disabled ? style.disabledTwoText : null,
        ]}
        pressFun={() => {
          ws.send(JSON.stringify({ action: "userCardPass" }));
        }}
        divStyle={[
          style.buttons,
          style.buttonThree,
          disabled ? style.disabledTwo : null,
        ]}
      ></ButtonCustom>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    height: 150,
    backgroundColor: "rgba(34, 32, 32, 0.94)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    transform: [{ translateX: -150 }, { translateY: -75 }], // half of width and height
  },
  buttons: {
    borderWidth: 2,
    borderColor: "rgb(214, 214, 214)",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  buttonOne: {
    borderColor: "rgb(93, 255, 28)",
  },
  buttonTwo: {
    borderColor: "rgb(255, 178, 12)",
  },
  buttonThree: {
    borderColor: "rgb(142, 47, 250)",
  },
  textStyle: {
    fontWeight: "800",
    color: "white",
    fontSize: 20,
  },
  textOne: {
    color: "rgb(184, 255, 70)",
  },
  textTwo: {
    color: "rgb(255, 213, 27)",
  },
  textThree: {
    color: "rgb(142, 47, 250)",
  },
  disabledTwo: {
    borderColor: "rgb(99, 70, 10)",
  },
  disabledTwoText: {
    color: "rgb(105, 89, 16)",
  },
});
