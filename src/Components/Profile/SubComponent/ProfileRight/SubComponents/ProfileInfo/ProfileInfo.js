import { useCallback, useEffect, useState } from "react";
import { backendUrlAtom, themeAtom } from "../../../../../../AppState/Atoms";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import { useUserSignedIn } from "../../../../../../Hooks/useUserSignedIn";
import getProfileInfo from "./Functions/getProfileInfo";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { debounce } from "lodash";
import changeUserName from "./Functions/changeUserName";
import { launchImageLibrary } from "react-native-image-picker";
import SkeletonLoadingOfprofileInfoSection from "./SubComponents/SkeletonLoadingOfProfileInfoSection";
import ProgressDot from "./SubComponents/ProgressDot/ProgressDot";
import GButton from "../../../../../SubComponents/GButton/GButton";
import { readFileAsBase64, uploadChunks } from "./Functions/readFileAsBase64";

export default function ProfileInfo() {
  const [userName, setUserName] = useState("");
  const [inputWidth, setInputWidth] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [stateLoading, setStateLoading] = useState("hide");
  const [backedUrl] = useAtom(backendUrlAtom);
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dkoptxs2o/image/upload/v1761653016/vecteezy_blue-profile-icon_36885313_odxqtn.png",
  );
  const [originalImageUrlState, setOriginalImageUrlState] = useState(
    "https://res.cloudinary.com/dkoptxs2o/image/upload/v1761653016/vecteezy_blue-profile-icon_36885313_odxqtn.png",
  );
  const navigation = useNavigation();
  const [uploadigState, setUploadingState] = useState(0);
  const [imageOnHover, setImageOnHover] = useState(false);
  const [loading, isAuth] = useUserSignedIn();
  const nav = useNavigation();
  const [componentData, setComponentData] = useState(false);
  const [theme] = useAtom(themeAtom);
  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        nav.navigate("login");
      }
    }
  }, [isAuth]);
  useEffect(() => {
    getProfileInfo(backedUrl + "/profile/info").then((a) => {
      if (a.hasOwnProperty("name") || a.hasOwnProperty("image")) {
        setComponentData(true);
        if (a["image"]) {
          setImage(a["image"]);
        }
        setOriginalImageUrlState(a["image"]);
        setUserName(a["name"]);
      }
    });
    if (Platform.OS !== "web") {
      navigation.setOptions({
        tabBarStyle: {
          display: "block",
        },
      });
    }
  }, []);
  const debouncedChangeUserName = useCallback(
    debounce(async (parameter) => {
      changeUserNameWrapper(parameter);
    }, 1000),
    [],
  );
  async function changeUserNameWrapper(parameter) {
    let res = await changeUserName(backedUrl, parameter);

    if (res["success"]) setStateLoading("success");
    else {
      setStateLoading("error");
    }
    setTimeout(() => {
      setStateLoading("hide");
    }, 1000);
  }
  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 1,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log("User cancelled image picker");
        return;
      }

      if (result.errorCode) {
        console.log("Error: ", result.errorMessage);
        return;
      }

      const asset = result.assets[0];

      setImage(asset.uri);

      const base64 = await readFileAsBase64(asset.uri);
      console.log(base64, "kk");
      uploadChunks(
        base64,
        asset.fileName || "image.jpg",
        setUploadingState,
        setImage,
        originalImageUrlState,
        backedUrl,
      );
    } catch (err) {
      console.error("❌ Image picker error:", err);
    }
  };

  return !componentData ? (
    <SkeletonLoadingOfprofileInfoSection />
  ) : (
    <View
      style={[
        style.outerdiv,
        {
          backgroundColor: theme.colors?.background,
          width: "100%",
          height: "100%",
        },
        Platform.OS !== "web" ? { flexDirection: "column-reverse" } : {},
      ]}
    >
      <View
        style={[
          style.userName,
          {
            backgroundColor: theme.colors?.background,
            width: "100%",
            height: "100%",
          },
          Platform.OS !== "web"
            ? {
                marginTop: 0,
                paddingTop: "20%",
                paddingLeft: 20,
                width: "100%",
              }
            : {},
        ]}
      >
        <Text
          style={[
            style.userNameText,
            { color: theme.colors?.textPrimary, marginBottom: 20 },
          ]}
        >
          User Name:
        </Text>
        <View
          style={[
            style.userNameEdit,
            { backgroundColor: theme.colors?.background },
          ]}
        >
          {/* Hidden Text to measure width */}
          <View style={style.progressBar}>
            <ProgressDot status={stateLoading} />
          </View>

          <Text
            style={[style.hiddenText]}
            onLayout={(e) => {
              const width = e.nativeEvent.layout.width;
              setInputWidth(width + 10); // Add some padding
            }}
          >
            {userName}
          </Text>
          <TextInput
            value={userName}
            onChangeText={(e) => {
              setUserName(e);
              setStateLoading("processing");

              debouncedChangeUserName(e);
            }}
            editable={disabled}
            style={[
              style.input,
              {
                width: inputWidth,
                maxWidth: 200,
                borderWidth: 0,
                backgroundColor: "transparent",
                color: theme.colors?.textPrimary,
                outlineStyle: "none",
                borderColor: theme.colors?.textPrimary,
                fontSize: 18,
              },
            ]}
          />

          <Image
            style={[
              style.imageIcon,
              style.pressButton,
              { backgroundColor: "white", borderRadius: 2, marginLeft: 15 },
              { left: inputWidth },
              inputWidth > 200 ? { left: 200 } : {},
            ]}
            source={require("@/assets/edit.png")}
          />
        </View>
      </View>
      <View>
        <Pressable
          onPressOut={() => {
            if (uploadigState === 0 && Platform.OS === "web") {
              pickImage();
            }
          }}
          onHoverIn={() => {
            if (Platform.OS === "web") {
              setImageOnHover(true);
            }
          }}
          onHoverOut={() => {
            if (Platform.OS === "web") {
              setImageOnHover(false);
            }
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 200,
            overflow: "hidden",
          }}
        >
          {imageOnHover && uploadigState === 0 ? (
            <View style={style.cameraIcon}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("@/assets/camera.png")}
              ></Image>
            </View>
          ) : null}
          {uploadigState !== 0 ? (
            <View style={style.cameraIcon}>
              <Text>{uploadigState}%</Text>
            </View>
          ) : null}
          <Image
            style={{ width: 200, height: 200, borderRadius: 200 }}
            resizeMode="contain"
            source={{
              uri: image,
            }}
          />
        </Pressable>
        {Platform.OS !== "web" ? (
          <GButton
            text={"Upload pic"}
            onClick={() => {
              if (uploadigState === 0 && Platform.OS !== "web") {
                pickImage();
              }
            }}
            setLoading={() => {}}
            loading={!(uploadigState === 0)}
          ></GButton>
        ) : null}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  outerdiv: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  userNameEdit: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameText: {
    fontSize: 18,
  },
  userName: {
    display: "flex",
    flex: 1,
  },
  imageIcon: {
    width: 19,
    height: 19,
    marginLeft: 6,
  },
  hiddenText: {
    position: "absolute",
    opacity: 0,
    fontSize: 16,
    padding: 0,
  },
  input: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,

    position: "absolute",
  },
  pressButton: {
    position: "absolute",
  },
  progressBar: {
    backgroundColor: "transparent",
    position: "absolute",
    left: -20,
  },
  cameraIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
