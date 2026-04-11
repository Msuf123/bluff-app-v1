import { useState } from "react";
import { themeAtom } from "../../../../AppState/Atoms";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";

import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GButton from "../../../SubComponents/GButton/GButton";

export default function JoinPopUp({ changeState }) {
  const [text, setText] = useState("");
  const [theme] = useAtom(themeAtom);
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);

  const hidePopUp = () => changeState(false);

  const navigateFun = () => {
    nav.navigate("Lobby", { action: "join", roomNumber: text });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:theme.colors?.transparentBackground,zIndex:12}}></View>
      <View
        style={[styles.wrapper, { backgroundColor: theme.colors.lobbyBackground }]}
      >
        <View style={styles.crossDiv}>
          <TouchableOpacity onPressOut={hidePopUp}>
            <Text
              style={{
                backgroundColor: theme.colors.lobbyBackground,
                color: theme.colors.textPrimary,
                fontWeight: "900",
                fontSize: 22,
                paddingHorizontal: 10,
                position: "relative",
                paddingTop: 5,
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            Enter Room ID:
          </Text>

          <TextInput
            placeholder="Room ID"
            value={text}
            onChangeText={setText}
            placeholderTextColor="#888"
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.inputBackground,
                borderColor: theme.colors.inputBorder,
                color: theme.colors.textPrimary,
              },
            ]}
          />

          <GButton
            text={"Join"}
            loading={loading}
            setLoading={setLoading}
            onClick={navigateFun}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    width: "80%",
    maxWidth: 450,
    height: 250,
    borderRadius: 10,
    zIndex: 12,
    backgroundColor: "#ffffff48", // Needed for shadow to be visible
    elevation: 6, // Android shadow

    ...(Platform.OS !== "web" && {
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    }),
  },

  crossDiv: {
    height: 35,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
    borderRadius: 15,
    overflow: "hidden",
  },

  mainContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },

  input: {
    width: "60%",
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});
