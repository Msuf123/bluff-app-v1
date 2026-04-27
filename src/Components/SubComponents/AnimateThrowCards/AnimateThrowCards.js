import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import { displayAnimation } from '../../../AppState/Atoms';
import { useAtom } from 'jotai';
import { useScreenDimensions } from '../../../Hooks/useScreenDimensions';

export default function AnimatedThrowCard({ fromPos, toPos, onAnimationEnd }) {
  const translateX = useRef(new Animated.Value(fromPos.x)).current;
  const translateY = useRef(new Animated.Value(fromPos.y)).current;
  const [displayCardThrowAnimation, setDisplayCardAnimaiton] =
    useAtom(displayAnimation);
  const { width, height } = useScreenDimensions();
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: toPos.x,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: toPos.y,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDisplayCardAnimaiton(false);
      onAnimationEnd?.();
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,

        {
          transform: [{ translateX }, { translateY }],
        },
      ]}
    >
      <Image
        source={require('@/assets/A.png')} // Your card image
        style={[
          styles.cardImage,
          width > 980 ? { width: 100, height: 100 } : {},
          width < 491 ? { width: 70, height: 70 } : {},
          width < 496 ? { width: 50, height: 50 } : {},
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: 60,
    height: 90,
    zIndex: 9,
    top: 0,
    left: 0,
  },
  cardImage: {
    marginTop: 5, // half of height — centers card vertically
    marginLeft: -5,
    width: 90,
    height: 90,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
});
