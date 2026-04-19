import { useAtom } from "jotai";
import { playerGameArea, themeAtom } from "../../../../../../AppState/Atoms";
import Toast from "react-native-toast-message";
import { StyleSheet, View } from "react-native";
import ButtonCustom from "../../../../../SubComponents/ButtonCustom/ButtonCustom";

export default function ReadyButton({ webScoket }) {
  const [roomDetails] = useAtom(playerGameArea);
  const [theme] = useAtom(themeAtom);
  function clickedReadyState() {
    let readySatus = false;
    if (
      roomDetails.leader === roomDetails.yourEmail &&
      roomDetails.players.length < 2
    ) {
      Toast.show({
        type: "info",
        text1: "Need more player",
        text2: "Can't start match with 1 player",
      });
    } else {
      for (let i of roomDetails.players) {
        if (i.email === roomDetails.yourEmail) {
          //   console.log("Changing vlaue of the user sate",i.email)
          readySatus = !i.readyStatus;
        }
      }
      webScoket.send(
        JSON.stringify({
          action: "readyPlayer",
          value: readySatus,
          room: roomDetails.room,
        }),
      );
    }
  }
  return (
    <View style={style.div}>
      <ButtonCustom
        pressFun={clickedReadyState}
        heading={
          roomDetails.leader === roomDetails.yourEmail ? "Start" : "Ready"
        }
        textStyle={style.buttonTextStyle}
        divStyle={[
          style.buttonDivStyle,
          { backgroundColor: theme?.colors?.primary },
        ]}
      ></ButtonCustom>
    </View>
  );
}

const style = StyleSheet.create({
  div: {
    height: 100,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDivStyle: {
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 4, // Safe on Android

    ...(Platform.OS !== "web" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }),
  },

  buttonTextStyle: {
    fontWeight: "600",
    fontSize: 20,
  },
});
