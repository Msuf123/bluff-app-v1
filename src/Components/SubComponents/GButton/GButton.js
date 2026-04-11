import { useAtom } from "jotai";
import { themeAtom } from "../../../AppState/Atoms";
import { Pressable, Text } from "react-native";
import Spinner from "../Spinner/Spinner";

export default function GButton({ onClick, text, loading, setLoading }) {
  const [theme] = useAtom(themeAtom);
  
  return (
    <Pressable
      onPress={() => {
        setLoading(true);
        if (typeof onClick === "function") {
          setLoading(false);
          onClick();
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }}
      style={{
        backgroundColor: theme?.colors?.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 5,
        minWidth: 100,
      }}
    >
      {!loading ? (
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
          {text}
        </Text>
      ) : (
        <Spinner />
      )}
    </Pressable>
  );
}
