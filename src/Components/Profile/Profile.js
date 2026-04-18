import { useAtom } from "jotai";
import { themeAtom } from "../../AppState/Atoms";
import { useScreenDimensions } from "../../Hooks/useScreenDimensions";
import { Platform, StyleSheet, View } from "react-native";
import PorfileLeftBar from "./SubComponent/ProfileLeftBar/ProfileLeftBar";
import { ProfileRight } from "./SubComponent/ProfileRight/ProfileRight";

export default function ProfilePage() {
  const { width } = useScreenDimensions();
  const [theme]=useAtom(themeAtom)
  return (
    <View style={[style.div,{backgroundColor:theme.colors?.background}]}>
      
      <View
        style={[
          style.main,
          
        ]}
      >
        {Platform.OS === "web" && width > 408 ? (
          <PorfileLeftBar></PorfileLeftBar>
        ) : null}
        <ProfileRight></ProfileRight>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    flex: 1,
  },
  textDiv: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  text: {
    color: "rgba(70, 212, 255, 1)",
    fontSize: 40,
    fontWeight: 600,
  },
  main: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
