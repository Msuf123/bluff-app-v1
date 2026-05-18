import { useAtom } from 'jotai';
import {
  playerCardChooseOnGameTable,
  themeAtom,
  webScoket,
} from '../../../../AppState/Atoms';

import ButtonCustom from '../../../SubComponents/ButtonCustom/ButtonCustom';
import { Platform, StyleSheet, View } from 'react-native';

export default function ThrowShowOptions({ disabled }) {
  const [cardChooseS, setCardChoose] = useAtom(playerCardChooseOnGameTable);
  const [ws] = useAtom(webScoket);
  const [theme] = useAtom(themeAtom);
  const styles = makeStyles(theme);

  function throwCards() {
    setCardChoose(true);
  }

  return (
    <View style={styles.div}>
      <ButtonCustom
        heading={'Throw'}
        pressFun={throwCards}
        textStyle={[styles.textStyle, styles.textOne]}
        divStyle={[styles.buttons, styles.buttonOne]}
      />

      <View style={styles.divider} />

      <ButtonCustom
        heading={'Show'}
        textStyle={[
          styles.textStyle,
          styles.textTwo,
          disabled && styles.disabledText,
        ]}
        divStyle={[
          styles.buttons,
          styles.buttonTwo,
          disabled && styles.disabledButton,
        ]}
        pressFun={() => {
          ws.send(JSON.stringify({ action: 'showCards' }));
        }}
      />

      <View style={styles.divider} />

      <ButtonCustom
        heading={'Pass'}
        textStyle={[
          styles.textStyle,
          styles.textThree,
          disabled && styles.disabledText,
        ]}
        pressFun={() => {
          ws.send(JSON.stringify({ action: 'userCardPass' }));
        }}
        divStyle={[
          styles.buttons,
          styles.buttonThree,
          disabled && styles.disabledButton,
        ]}
      />
    </View>
  );
}

const makeStyles = theme =>
  StyleSheet.create({
    div: {
      width: 320,
      height: 90,
      backgroundColor: 'rgba(0, 0, 0, 0.63)',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#CED4DA',

      overflow: 'hidden',
      ...(Platform.OS === 'web' && {
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      }),
      ...(Platform.OS !== 'web' && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
      }),
    },

    // Each button block
    buttons: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 6,
      backgroundColor: 'transparent',
      borderRadius: 0,
      borderWidth: 0,
    },

    // Throw — use theme primary with a green-ish tint kept for game semantics
    buttonOne: {
      borderRightWidth: 0,
    },
    // Show — amber tint kept for game semantics
    buttonTwo: {
      borderRightWidth: 0,
    },
    // Pass — purple tint kept for game semantics
    buttonThree: {},

    // Top accent bar per button (via borderTopWidth trick on text container)
    textStyle: {
      fontWeight: '800',
      fontSize: 17,
      fontFamily: theme.fonts.heading,
      letterSpacing: 0.5,
    },
    textOne: {
      color: '#8DFF3A', // Throw — green, game semantic color
    },
    textTwo: {
      color: '#FFD51B', // Show — amber, game semantic color
    },
    textThree: {
      color: '#66B2FF', // Pass — uses theme primary (blue / pink)
    },

    // Disabled states
    disabledButton: {
      opacity: 0.35,
    },
    disabledText: {
      color: '#6C757D',
    },

    // Vertical divider between buttons
    divider: {
      width: 1,
      height: '55%',
      backgroundColor: '#CED4DA',
    },
  });
