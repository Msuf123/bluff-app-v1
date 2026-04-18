import { useAtom } from "jotai";
import { themeAtom } from "../../../../../../../AppState/Atoms";
import { StyleSheet, View } from "react-native";

export default function SkeletonLoadingOfprofileInfoSection() {
  const [theme]=useAtom(themeAtom)
  const skeletonColor =
    theme?.colors?.background === "#FFFFFF" ? "#e0e0e0" : "#3A3A3A";

  return (
    <View style={{flex:1,backgroundColor:theme.colors?.background}}>
    <View
      style={[
        style.outerdiv,
        { backgroundColor: theme?.colors?.background },
       
      ]}
    >
      {/* Skeleton for username and input */}
      <View style={style.userName}>
        <View style={[style.skeletonText, { backgroundColor: skeletonColor }]} />
        <View style={style.userNameEdit}>
          <View
            style={[
              style.skeletonInput,
              { width: 120, backgroundColor: skeletonColor },
            ]}
          />
          <View style={[style.skeletonIcon, { backgroundColor: skeletonColor }]} />
        </View>
      </View>

      {/* Skeleton for image */}
      <View>
        <View style={style.skeletonImageWrapper}>
          <View
            style={[style.skeletonImage, { backgroundColor: skeletonColor }]}
          />
        </View>
      </View>
    </View>
    </View>
  );
}

const style = StyleSheet.create({
  skeletonText: {
    width: 100,
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonInput: {
    height: 20,
    borderRadius: 4,
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  skeletonImageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  outerdiv: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  userNameEdit: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    display: "flex",
  },
});