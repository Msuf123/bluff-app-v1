import { useAtom } from 'jotai';
import { memo, useCallback, useRef, useState } from 'react';
import {
  playerCardsArrayThatHeSelected,
  themeAtom,
} from '../../../../../../../AppState/Atoms';
import { useScreenDimensions } from '../../../../../../../Hooks/useScreenDimensions';
import {
  Image,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

const ImageCardWithState = memo(function ImageCardWithState({ cardName, url }) {
  const [clicked, setClicked] = useState(false);
  const clickedRef = useRef(false);
  const [, setUserSelectedCards] = useAtom(playerCardsArrayThatHeSelected);
  const [theme] = useAtom(themeAtom);
  const { width } = useScreenDimensions();
  const styles = makeCardStyles(theme);
  const handleSelect = useCallback(() => {
    const wasSelected = clickedRef.current;
    const newValue = !wasSelected;

    clickedRef.current = newValue;
    setClicked(newValue);

    setUserSelectedCards(cards => {
      const key = JSON.stringify(cardName);
      const exists = cards.some(c => JSON.stringify(c) === key);

      if (newValue && !exists) {
        return [...cards, cardName];
      }

      if (!newValue) {
        return cards.filter(c => JSON.stringify(c) !== key);
      }

      return cards;
    });
  }, [cardName, setUserSelectedCards]);

  const imgSize = width > 980 ? 90 : 72;

  return (
    <Pressable
      style={[styles.card, clicked && styles.cardSelected]}
      onTouchEnd={() => {
        handleSelect();
      }}
    >
      {/* Selected indicator dot */}
      {clicked && <View style={styles.selectedDot} />}

      <Image
        style={[styles.img, { width: imgSize, height: imgSize }]}
        resizeMode="contain"
        source={{ uri: url }}
        fadeDuration={100}
      />
    </Pressable>
  );
});

export default ImageCardWithState;

const makeCardStyles = theme =>
  StyleSheet.create({
    card: {
      width: 90,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: theme.colors.inputBorder,
      backgroundColor: theme.colors.inputBackground,
      marginHorizontal: 3,
      position: 'relative',
      ...(Platform.OS === 'web' && {
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, border-color 0.15s ease',
      }),
      ...(Platform.OS !== 'web' && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      }),
    },
    cardSelected: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
      backgroundColor: theme.colors.inputBackground,
      transform: [{ translateY: -8 }],
      ...(Platform.OS === 'web' && {
        boxShadow: `0 6px 20px ${theme.colors.primary}55`,
      }),
      ...(Platform.OS !== 'web' && {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6,
      }),
    },
    selectedDot: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    img: {
      width: 72,
      height: 72,
    },
  });
