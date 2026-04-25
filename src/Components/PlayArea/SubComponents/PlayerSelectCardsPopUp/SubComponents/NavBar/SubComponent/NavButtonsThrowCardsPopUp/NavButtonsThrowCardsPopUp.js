import { useAtom } from 'jotai';
import {
  playerCardChooseOnGameTable,
  playerCardsArrayThatHeSelected,
  playersGameTableInfo,
  throwCardLabel,
  throwCardsButtonStatus,
  webScoket,
} from '../../../../../../../../AppState/Atoms';
import { useEffect, useRef } from 'react';
import { useScreenDimensions } from '../../../../../../../../Hooks/useScreenDimensions';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
} from 'react-native';
import ButtonCustom from '../../../../../../../SubComponents/ButtonCustom/ButtonCustom';

export default function NavButtonsThrowCardPopUp() {
  const [ws] = useAtom(webScoket);
  const [throwCard, setThrowCards] = useAtom(playerCardsArrayThatHeSelected);
  const [loading, setLoading] = useAtom(throwCardsButtonStatus);
  const [cardLabel] = useAtom(throwCardLabel);
  const [cardChooseS, setCardChoose] = useAtom(playerCardChooseOnGameTable);
  const [playerTableInfo, setPlayerTabelInfo] = useAtom(playersGameTableInfo);
  const payerLableRef = useRef(playersGameTableInfo);
  const playerLabelRefOfCardsWhenItsNotSet = useRef(cardLabel);
  const { width } = useScreenDimensions();

  useEffect(() => {
    payerLableRef.current = playerTableInfo.throwAreaCards.cardLable;
  }, [playerTableInfo]);

  useEffect(() => {
    playerLabelRefOfCardsWhenItsNotSet.current = cardLabel;
  }, [cardLabel]);

  function handelThrowCards() {
    if (!loading && throwCard.length !== 0) {
      if (payerLableRef.current && payerLableRef.current !== 'Of') {
        ws.send(
          JSON.stringify({
            action: 'throwCards',
            cards: throwCard,
            lable: payerLableRef.current,
          }),
        );
      } else {
        ws.send(
          JSON.stringify({
            action: 'throwCards',
            cards: throwCard,
            lable: playerLabelRefOfCardsWhenItsNotSet.current,
          }),
        );
      }
      setThrowCards([]);
      setLoading(true);
    }
  }

  const isNarrow = width < 552;
  const isSmall = width < 824;
  const isTiny = width < 644;

  return (
    <View
      style={[
        styles.container,
        isSmall && { paddingHorizontal: 8 },
        isNarrow && styles.containerVertical,
      ]}
    >
      {/* Back Button — matches TopBar backButton style */}
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          isTiny && styles.backButtonSmall,
          isNarrow && styles.backButtonFullWidth,
          pressed && styles.backButtonPressed,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => setCardChoose(false)}
      >
        <View style={styles.backButtonInner}>
          <Image
            style={[
              styles.backIcon,
              isSmall && { width: 16, height: 16 },
              isTiny && { width: 14, height: 14 },
            ]}
            source={require('@/assets/BackIconYellow.png')}
          />
        </View>
      </Pressable>

      {/* Throw Cards Button — matches TopBar scoreBoard glass panel style */}
      <Pressable
        style={({ pressed }) => [
          styles.throwButton,
          loading && styles.throwButtonLoading,
          isTiny && styles.throwButtonSmall,
          isNarrow && styles.throwButtonFullWidth,
          pressed && !loading && styles.throwButtonPressed,
        ]}
        onPress={handelThrowCards}
        disabled={loading}
      >
        <Text
          style={[
            styles.throwButtonText,
            loading && styles.throwButtonTextLoading,
            isTiny && { fontSize: 12 },
          ]}
        >
          {!loading ? 'Throw Cards' : 'Loading...'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Container ──────────────────────────────────────────────────────────────
  container: {
    width: '100%',
    alignSelf: 'stretch', // ✅ important
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'red',
    borderTopWidth: 1,
    gap: 10,
  },
  containerVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },

  // ── Back Button ─────────────────────────────────────────────────────────────
  // Mirrors TopBar's backButton + backButtonInner pattern
  backButton: {
    padding: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // same as TopBar backButton
    borderWidth: 1,
    borderColor: 'rgba(255, 221, 33, 0.4)', // yellow tint from BackIconYellow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  backButtonSmall: {
    padding: 5,
  },
  backButtonFullWidth: {
    width: '100%',
    maxWidth: 250,
    alignItems: 'center',
  },
  backButtonPressed: {
    backgroundColor: 'rgba(255, 221, 33, 0.2)',
  },
  backButtonInner: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },

  // ── Throw Button ────────────────────────────────────────────────────────────
  // Mirrors TopBar's scoreBoard glass panel aesthetic
  throwButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.15)', // green tinted glass
    borderRadius: 12, // matches TopBar scoreBoard
    paddingHorizontal: 0,
    paddingVertical: 10,
    minWidth: 150,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.5)', // green border, like TopBar's white border
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  throwButtonLoading: {
    backgroundColor: 'rgba(165, 214, 167, 0.12)',
    borderColor: 'rgba(165, 214, 167, 0.35)',
  },
  throwButtonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    minWidth: 110,
    borderRadius: 10,
  },
  throwButtonFullWidth: {
    width: '100%',
    maxWidth: 250,
  },
  throwButtonPressed: {
    backgroundColor: 'rgba(76, 175, 80, 0.28)',
  },
  throwButtonText: {
    color: '#FFFFFF', // matches TopBar value text
    fontSize: 15,
    fontWeight: '700', // matches TopBar value fontWeight
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  throwButtonTextLoading: {
    color: 'rgba(255, 255, 255, 0.5)', // dimmed like TopBar label color
    fontWeight: '600',
  },
});
