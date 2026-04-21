import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ListPlayer() {
  const [randomPlayers] = useAtom(scorePlayer);
  const { width } = useScreenDimensions();

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          width < 400 && styles.containerSmall,
        ]}
      >
        {randomPlayers.map((item, index) => (
          <View
            style={[
              styles.playerRow,
              width < 400 && styles.playerRowSmall,
              width >= 400 && width < 600 && styles.playerRowMedium,
            ]}
            key={index}
          >
            <View
              style={[
                styles.indexCircle,
                width < 400 && styles.indexCircleSmall,
              ]}
            >
              <Text
                style={[styles.indexText, width < 400 && styles.indexTextSmall]}
              >
                {index + 1}
              </Text>
            </View>
            <Text
              style={[
                styles.playerName,
                width < 400 && styles.playerNameSmall,
                width >= 400 && width < 600 && styles.playerNameMedium,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Button title="Okay"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "80%",
    margin: "auto",
    borderRadius: 20,
    height: "80%",
    backgroundColor: "rgba(19, 19, 19, 0.95)",
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    width: "100%",
  },
  containerSmall: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  // Player Row Styles
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 12,
    width: "90%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",

    ...(Platform.OS !== "web" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    }),
    ...(Platform.OS === "web" && {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
    }),
    elevation: 3,
  },
  playerRowSmall: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 4,
    width: "95%",
  },
  playerRowMedium: {
    paddingHorizontal: 14,
    paddingVertical: 11,
  },

  // Index Circle Styles
  indexCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  indexCircleSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
    borderWidth: 1.5,
  },

  // Index Text Styles
  indexText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
  indexTextSmall: {
    fontSize: 14,
  },

  // Player Name Styles
  playerName: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
    flex: 1,
  },
  playerNameSmall: {
    fontSize: 14,
  },
  playerNameMedium: {
    fontSize: 16,
  },
});
