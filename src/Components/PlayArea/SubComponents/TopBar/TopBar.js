import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { playersGameTableInfo } from '../../../../AppState/Atoms';
import { useScreenDimensions } from '../../../../Hooks/useScreenDimensions';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function TopBar() {
  const nav = useNavigation();
  const [scoreBoardscoreBoard, setScoreBoard] = useAtom(playersGameTableInfo);
  const { width } = useScreenDimensions();

  // No breakpoint variables - using direct width checks in styles

  return (
    <View style={[styles.container]}>
      {/* Back Button */}
      <Pressable
        style={[styles.backButton, width < 400 && styles.backButtonSmall]}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPressOut={() => {
          nav.popTo('home');
        }}
      >
        <View style={styles.backButtonInner}>
          <Image
            source={require('@/assets/BackIconRed.png')}
            style={[styles.backIcon, width < 400 && styles.backIconSmall]}
          />
        </View>
      </Pressable>

      {/* Score Board */}
      <View
        style={[
          styles.scoreBoard,
          width < 552 && styles.scoreBoardVertical,
          width >= 400 && width < 600 && styles.scoreBoardSmall,
          width >= 600 && width < 900 && styles.scoreBoardMedium,
        ]}
      >
        <ScoreItem
          label="Total cards"
          value={scoreBoardscoreBoard.throwAreaCards.totalNumberOfCards || '0'}
          width={width}
        />

        <View
          style={[styles.divider, width < 552 && styles.dividerHorizontal]}
        />

        <ScoreItem
          label="Latest player"
          value={
            trimName(
              scoreBoardscoreBoard.throwAreaCards.playerWhoThrewLatestCard ||
                '',
            ) + '...'
          }
          width={width}
        />

        <View
          style={[styles.divider, width < 552 && styles.dividerHorizontal]}
        />

        <ScoreItem
          label="Latest card"
          value={
            scoreBoardscoreBoard.throwAreaCards.currentNumberOfCards || '0'
          }
          width={width}
        />

        <View
          style={[styles.divider, width < 552 && styles.dividerHorizontal]}
        />

        <ScoreItem
          label="Card name"
          value={scoreBoardscoreBoard.throwAreaCards.cardLable || '—'}
          width={width}
        />
      </View>

      {/* Spacer to balance layout */}
      {width >= 400 && <View style={styles.spacer} />}
    </View>
  );
}
function ScoreItem({ label, value, width }) {
  return (
    <View style={[styles.scoreItem, width < 552 && styles.scoreItemVertical]}>
      <Text
        style={[
          styles.label,
          width < 262 && styles.labelXSmall,
          width >= 262 && width < 676 && styles.labelSmall,
        ]}
      >
        {label}:
      </Text>
      <Text
        style={[
          styles.value,
          width < 262 && styles.valueXSmall,
          width >= 262 && width < 676 && styles.valueSmall,
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  );
}
function trimName(text) {
  return text.slice(0, 4);
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 60,
    zIndex: 2,
  },

  // Back Button Styles
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButtonSmall: {
    padding: 3,
    alignSelf: 'center',
    marginBottom: 6,
    marginRight: 2,
  },
  backButtonInner: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 28,
    height: 28,
    transform: [{ rotateY: '180deg' }],
  },
  backIconSmall: {
    width: 20,
    height: 20,
  },

  // Score Board Styles
  scoreBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreBoardVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  scoreBoardSmall: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 6,
  },
  scoreBoardMedium: {
    paddingHorizontal: 12,
  },

  // Score Item Styles
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  scoreItemVertical: {
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
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
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    maxWidth: 80,
  },
  valueSmall: {
    fontSize: 11,
    maxWidth: 60,
  },
  valueXSmall: {
    fontSize: 10,
    maxWidth: 'auto',
    flexShrink: 1,
  },

  // Divider
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 4,
  },
  dividerHorizontal: {
    width: '100%',
    height: 1,
    marginHorizontal: 0,
    marginVertical: 2,
  },

  // Spacer for layout balance
  spacer: {
    width: 0,
  },
});
