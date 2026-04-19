import { useRef, useState } from "react";
import { playerGameArea, themeAtom } from "../../../../../../AppState/Atoms";
import { useAtom } from "jotai";
import gesture from "./gesture";
import { Image, StyleSheet, Text, View } from "react-native";
import ReadySatus from "./SubComponent/ReadyStatus/ReadyStatus";
import MicOption from "../../../../../SubComponents/MicOption/MicOption";

export default function PlayerCard({ name, email, readySataus, url }) {
  const [width, setWidth] = useState(-10);
  const [roomDetails] = useAtom(playerGameArea);
  const [theme] = useAtom(themeAtom);
  const ref = useRef();
  const handlers = gesture(width, setWidth, ref);

  return (
    <View style={style.div} ref={ref}>
      <View style={[style.overlap, { width: width }]}></View>
      <View
        style={[
          style.front,
          { zIndex: 2, backgroundColor: theme?.colors?.background },
        ]}
      >
        <Image
          resizeMode="contain"
          style={[style.img, style.profile]}
          source={{ uri: url }}
        ></Image>
        <Text style={[style.name, { color: theme?.colors?.textPrimary }]}>
          {name.length > 12 ? name.slice(0, 11) + " ..." : name}
        </Text>

        <ReadySatus boolVal={readySataus}></ReadySatus>
        <MicOption></MicOption>
      </View>

      {roomDetails.leader === email ? (
        <Image
          style={[style.img, style.leader, { zIndex: 12 }]}
          source={require("@/assets/admin.png")}
          resizeMode="contain"
        ></Image>
      ) : (
        <></>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    position: "relative",
    marginLeft: 0,
    marginRight: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 70,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 5, // Android shadow
    alignSelf: "center",
    maxWidth: 550,
    width: "98%",

    ...(Platform.OS !== "web" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    }),
  },

  img: {
    width: 100,
    height: 100,
  },

  profile: {
    borderRadius: 200,
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 5,
  },

  leader: {
    width: "10%",
    height: "40%",

    marginRight: 10,
    position: "absolute",
    top: 20,
    right: 10,
    width: 30,
    height: 30,
    zIndex: 10,
  },

  front: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },

  overlap: {
    backgroundColor: "rgba(243, 45, 10, 0.9)",
    position: "absolute",
    width: 0,
    height: "100%",
    zIndex: 2,
  },

  name: {
    fontSize: 19,
  },
});
