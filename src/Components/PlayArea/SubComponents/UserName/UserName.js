import { StyleSheet, Text, View } from 'react-native';
import { useScreenDimensions } from '../../../../Hooks/useScreenDimensions';

export default function UserName({
  userNameBottom,
  userName,
  displayBottom,
  displayHorizontalPostive,
  displayHorizontalNegative,
}) {
  const { width, height } = useScreenDimensions();

  return (
    <View
      style={[
        style.div,
        userNameBottom
          ? {
              height: 20,
              top: '75%',
              transform: [{ translateY: '100%' }],
            }
          : {},
        displayHorizontalPostive
          ? {
              left: '80%',
              top: '50%',
              transform: [{ translateY: '-50%' }, { rotate: '90deg' }],
            }
          : {},

        userNameBottom && width < 646 ? { top: '85%' } : {},
        userNameBottom && width < 496 ? { top: '72%' } : {},
        userNameBottom && width < 344 ? { top: '25%' } : {},
        userNameBottom && width > 980 ? { width: 'max-content' } : {},
        displayHorizontalPostive && width < 646
          ? {
              left: '75%',

              top: '50%',
            }
          : {},
        displayHorizontalPostive && width < 496 ? { left: '70%' } : {},
        displayHorizontalPostive && width < 344 ? { left: '65%' } : {},
        displayHorizontalPostive && width > 980 ? { width: 'max-content' } : {},

        displayHorizontalNegative
          ? {
              top: '50%',
              left: '-80%',
              transform: [{ translateY: '-50%' }, { rotate: '-90deg' }],
            }
          : {},
        displayHorizontalNegative && width < 646
          ? {
              left: '-75%',
              top: '50%',
            }
          : {},
        displayHorizontalNegative && width < 496
          ? {
              left: '-70%',
            }
          : {},
        displayHorizontalNegative && width < 344
          ? {
              left: '-65%',
            }
          : {},
        displayHorizontalNegative && width > 980
          ? { width: 'max-content', left: '-130%' }
          : {},
      ]}
    >
      <Text
        style={[
          style.userNameStyle,
          width > 980 ? { fontSize: 18 } : {},
          width < 491 ? { fontSize: 15 } : {},
          width < 496 ? { fontSize: 10 } : {},
          width < 344 ? { fontSize: 5 } : {},
        ]}
      >
        {userName.length > 6 ? userName.slice(0, 6) + '...' : userName}
      </Text>
    </View>
  );
}
//
const style = StyleSheet.create({
  div: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'show',
    justifyContent: 'center',
    alignItem: 'center',
    width: '100%',
  },
  userNameStyle: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },
});
