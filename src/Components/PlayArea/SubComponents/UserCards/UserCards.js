import { useAtom } from 'jotai';
import {
  animationDbs,
  playerCardChooseOnGameTable,
  playersGameTableInfo,
} from '../../../../AppState/Atoms';
import { useEffect, useRef } from 'react';
import { useScreenDimensions } from '../../../../Hooks/useScreenDimensions';
import { Animated, Image, StyleSheet, View } from 'react-native';
import PlayerCards from '../PlayerCards/PlayerCards';
import ClikOptions from '../ClickOptionsCards/ClickOptionsCards';
import UserName from '../UserName/UserName';
import { useRoute } from '@react-navigation/native';

export default function UserCards({
  toShow,
  mainPlayer,
  rotateValue,
  rotate,
  cardDetails,
  currentPlayer,
  yourName,
  styles,

  scaledImageSize,
}) {
  const [yourTurn] = useAtom(playerCardChooseOnGameTable);
  const [playerGameTableInfoState] = useAtom(playersGameTableInfo);
  const [_, setUserCardPostion] = useAtom(animationDbs);
  const userCardRef = useRef();
  const { width, height } = useScreenDimensions();
  console.log(currentPlayer, 'james');
  function autoValueSteForAnimation(playerName) {
    setUserCardPostion(org => ({
      ...org,
      [playerName]: userCardRef.current,
    }));
  }

  useEffect(() => {
    if (cardDetails && !mainPlayer && toShow) {
      autoValueSteForAnimation(cardDetails.opponentName);
    }
  }, [playerGameTableInfoState]);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const sizeAnimation = useRef(new Animated.Value(1)).current;
  const route = useRoute();
  let isHome = route.path !== '/play';
  useEffect(() => {
    let animation = Animated.loop(
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(sizeAnimation, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(sizeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    animation.start();
    return () => {
      // animation.stop()
    };
  }, []);

  return (
    //to show is the value that will tell whether to show the cards or not
    <View
      style={[
        style.playersDiv,
        styles,
        toShow ? {} : { backgroundColor: 'transparent' },
        mainPlayer ? { width: '100%', height: 90 } : {},
        rotateValue === 90 || rotateValue === -90
          ? {
              width: 70,
              height: 70,
              flexDirection: 'row',

              margin: 0,
            }
          : {
              maxHeight: 130,
              height: '100%',
              margin: 0,
            },

        rotateValue === 90 ? { flexDirection: 'row-reverse' } : {},
        width > 980 && (rotateValue === 90 || rotateValue === -90)
          ? { height: '100%', marginLeft: 40, marginRight: 40 }
          : {},
        width < 344 && (rotateValue === 90 || rotateValue === -90)
          ? { width: 40, height: 40 }
          : {},
        width < 491 && (rotateValue !== 90 || rotateValue !== -90)
          ? { height: '80%' }
          : {},
        width < 496 && (rotateValue !== 90 || rotateValue !== -90)
          ? { height: '100%' }
          : {},
      ]}
    >
      {toShow ? (
        <>
          {/**Here we have determined how many cads we need to show based on two show bool value which is bieng sent is centertAble.js and passed as prop */}
          {/**WAE only want to show cadrs when we are the main plyer other wise show a card back side */}
          {mainPlayer ? (
            <PlayerCards containerWidth={scaledImageSize}></PlayerCards>
          ) : (
            <Image
              source={require('@/assets/A.png')}
              ref={userCardRef}
              resizeMode="contain"
              style={[
                style.cards,
                rotate ? { transform: [{ rotate: rotateValue + 'deg' }] } : {},
                mainPlayer ? { width: 70, height: 70 } : {},
                width > 980
                  ? {
                      width: 100,
                      height: 100,
                    }
                  : {},
                width < 491 ? { width: 70, height: 70 } : {},
                width < 496 ? { width: 50, height: 50 } : {},
                width < 344 ? { width: 30, height: 30 } : {},
              ]}
            ></Image>
          )}
          {/**WE only want to show click option when we are not the mainPLayer i.e the click option are mic so only other players mic should be visible and the player exists so we used to show we don't want to show 3 mic in a 2 player game */}
          {!mainPlayer && toShow && !isHome ? (
            <ClikOptions
              topValue={rotateValue === 90 || rotateValue === -90}
              rotateValue={rotateValue}
            ></ClikOptions>
          ) : null}
          {/**Same mic logic for username */}
          {!mainPlayer && toShow && route.name !== 'home' ? (
            <UserName
              displayBottom={rotateValue !== 90}
              displayHorizontalPostive={rotateValue === 90}
              displayHorizontalNegative={rotateValue === -90}
              userName={cardDetails.nickName || '...'}
              userNameBottom={rotateValue !== 90 || rotateValue !== -90}
            ></UserName>
          ) : null}

          {/**Same for the notifying who is the current player here my we add onle mroe coiontion we use currentPlayer===cardDetails.opponentName to
           * determine wather the player is current or not if we are the current player then notify the user who is the curretn by diplaying this Animate.view  */}
          {!mainPlayer &&
          toShow &&
          currentPlayer === cardDetails.opponentName &&
          !isHome ? (
            <Animated.View
              style={[
                style.arrow,
                rotateValue === 90 || rotateValue === -90
                  ? {
                      transform: [{ scale: sizeAnimation }, { rotate: '0deg' }],
                    }
                  : {
                      transform: [
                        { scale: sizeAnimation },
                        { rotate: '-90deg' },
                      ],
                      top: '50%',
                      left: '-5',
                    },
              ]}
            ></Animated.View>
          ) : null}
          {/**IF we are current player the show the thorwOptions */}
        </>
      ) : null}
    </View>
  );
}
//mainPlayer && details.yourName == details.currentPlayer
const style = StyleSheet.create({
  outerDiv: {
    flexDirection: 'row',
    marginBottom: 100,
    backgroundColor: 'black',
  },
  cards: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  playersDiv: {
    width: 70,
    backgroundColor: '',
    overflow: 'visible',
    margin: 0,
    alignItem: 'center',
    justifyContent: 'center',
    height: '100%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderTopColor: 'green',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    top: -4,
  },
});
