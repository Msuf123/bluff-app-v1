import { useAtom } from 'jotai';
import {
  backendUrlAtom,
  playersGameTableInfo,
} from '../../../../AppState/Atoms';
import { useScreenDimensions } from '../../../../Hooks/useScreenDimensions';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function PlayerCards({ containerWidth }) {
  const [playersGameTableInfoState] = useAtom(playersGameTableInfo);
  const [urls] = useAtom(backendUrlAtom);
  const { width } = useScreenDimensions();
  if (!playersGameTableInfoState) return null;

  const playerCards = playersGameTableInfoState.cards;
  const numberOfCards = playerCards.length;

  const { cardWidth, cardHeight, overlap, totalStackWidth } = useMemo(() => {
    if (numberOfCards === 0)
      return { cardWidth: 0, cardHeight: 0, overlap: 0, totalStackWidth: 0 };
    // Default card sizes (base dimensions)
    let baseCardWidth = 120;
    let baseCardHeight = 120;
    let baseOverlap = 35;
    if (width < 1050) {
      baseCardHeight = 80;
      baseCardHeight = 80;
      baseOverlap = 20;
    }
    if (width < 756) {
      baseCardHeight = 60;
      baseCardHeight = 60;
      baseOverlap = 20;
    }
    if (width < 406) {
      baseCardHeight = 40;
      baseCardHeight = 40;
      baseOverlap = 10;
    }
    // Add padding/margin buffer (10% of container width)
    const availableWidth = containerWidth.width * 0.9; // Use 90% to add safety margin

    // Calculate what the total width would be at base size
    const baseStackWidth = baseCardWidth + (numberOfCards - 1) * baseOverlap;

    let scale = 1;

    // If cards overflow the container, shrink them MORE aggressively
    if (baseStackWidth > availableWidth) {
      scale = availableWidth / baseStackWidth;
    }
    // If cards are too small compared to container, enlarge them (but cap at 1.5x)
    else if (numberOfCards < 5) {
      scale = Math.min(0.9, (availableWidth / baseStackWidth) * 0.9);
    }

    const finalCardWidth = baseCardWidth * scale;
    const finalCardHeight = baseCardHeight * scale;
    const finalOverlap = baseOverlap * scale;
    const finalStackWidth = finalCardWidth + (numberOfCards - 1) * finalOverlap;

    return {
      cardWidth: finalCardWidth,
      cardHeight: finalCardHeight,
      overlap: finalOverlap,
      totalStackWidth: finalStackWidth,
    };
  }, [numberOfCards, containerWidth, width]);

  return (
    <View
      style={[
        styles.outer,
        {
          width: totalStackWidth,
          left: -(totalStackWidth - containerWidth.width) / 2,
        },
        width < 858 ? { marginBottom: 10 } : {},
      ]}
    >
      {playerCards.map((cardObj, i) => (
        <Image
          key={i}
          source={{ uri: urls + '/image/' + cardObj.name }}
          resizeMode="contain"
          style={[
            styles.card,
            {
              width: cardWidth,
              height: cardHeight,
              left: i * overlap,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    position: 'absolute',
  },
});
