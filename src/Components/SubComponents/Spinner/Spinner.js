import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const Spinner = ({ size = 40, color = '#4B5563', marginVal = 0 }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size,
          height: size,
          borderColor: color,
          transform: [{ rotate }],
          marginLeft: marginVal,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    borderWidth: 3,
    borderRadius: 9999,
    borderTopColor: 'transparent',
  },
});

export default Spinner;
