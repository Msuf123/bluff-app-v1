import { useAtom } from 'jotai';
import { useScreenDimensions } from '../../../../../../../../Hooks/useScreenDimensions';
import { playerCardsArrayThatHeSelected } from '../../../../../../../../AppState/Atoms';
import { StyleSheet, Text, View } from 'react-native';

export default function NumberOfSelectedCards() {
  const { width } = useScreenDimensions();
  const [numberOfSelectedCards] = useAtom(playerCardsArrayThatHeSelected);

  const count = numberOfSelectedCards ? numberOfSelectedCards.length : 0;
  const hasCards = count > 0;

  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {/* Label — mirrors TopBar's label style */}
        <Text
          style={[
            styles.label,
            width < 676 && styles.labelSmall,
            width < 262 && styles.labelXSmall,
          ]}
        >
          Selected Cards:
        </Text>

        {/* Value — mirrors TopBar's value style */}
        <Text
          style={[
            styles.value,
            hasCards && styles.valueActive,
            width < 676 && styles.valueSmall,
            width < 262 && styles.valueXSmall,
          ]}
        >
          {count}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 1)', // matches TopBar container
  },

  // Glass pill — mirrors TopBar's scoreBoard panel
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // matches TopBar scoreBoard
    borderRadius: 12, // matches TopBar scoreBoard
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // matches TopBar scoreBoard
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, // matches TopBar scoreBoard
  },

  // Label — mirrors TopBar label text style
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 12,
  },
  labelXSmall: {
    fontSize: 10,
  },

  // Value — mirrors TopBar value text style
  value: {
    color: 'rgba(255, 255, 255, 0.4)', // dimmed when zero
    fontSize: 16,
    fontWeight: '700',
  },
  valueActive: {
    color: '#FFFFFF', // full white when cards are selected, matches TopBar value
  },
  valueSmall: {
    fontSize: 11,
  },
  valueXSmall: {
    fontSize: 10,
  },
});
