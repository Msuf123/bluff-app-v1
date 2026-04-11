import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove(); // Clean up the listener on unmount
    };
  }, []);

  return screenData;
};
