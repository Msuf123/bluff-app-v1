import { getDefaultStore, useAtom } from 'jotai';
import {
  animationDbs,
  displayAnimation,
  formPostionOfCardAnimaitonThrow,
  playersGameTableInfo,
  toPostionOfCardAnimationThrow,
} from '../../../../AppState/Atoms';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import AnimatedThrowCard from '../../../SubComponents/AnimateThrowCards/AnimateThrowCards';
import CenterTable from '../../../SubComponents/CenterTable/CenterTable';
import { animateIfReady } from './animateIfReady';
const originalImageSize = { width: 1920, height: 1080 };

export default function HomeBackGround({ children }) {
  const store = getDefaultStore();
  const [gameTableInfoState, setPlayersGmeTableInfo] =
    useAtom(playersGameTableInfo);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scaledImageSize, setScaledImageSize] = useState({
    width: 0,
    height: 0,
  });

  const [displayCardThrowAnimation, setDisplayCardAnimaiton] =
    useAtom(displayAnimation);

  const [toPostion, setToP] = useAtom(toPostionOfCardAnimationThrow);
  const [formPostion, setFromP] = useAtom(formPostionOfCardAnimaitonThrow);
  const [_, setAnimationState] = useAtom(animationDbs);
  useEffect(() => {
    if (containerSize.width && containerSize.height) {
      const { width: maxW, height: maxH } = containerSize;
      const imgAspectRatio = originalImageSize.width / originalImageSize.height;

      let finalW = maxW;
      let finalH = finalW / imgAspectRatio;

      if (finalH > maxH) {
        finalH = maxH;
        finalW = finalH * imgAspectRatio;
      }

      setScaledImageSize({ width: finalW, height: finalH });
    }
  }, [containerSize]);

  useFocusEffect(
    useCallback(() => {
      const { table: centerTable, ...restPropertiesAnimationDbs } =
        store.get(animationDbs);
      const intervalId = setInterval(() => {
        let randomPlayer = Math.floor(Math.random() * 3);
        let player = [
          'xrobo17@gmail.com',
          'xrobo19@gmail.com',
          'xrobo20@gmail.com',
        ];

        setAnimationState(org => ({
          ...org,
          currentPlayer: player[randomPlayer],
        }));
        setPlayersGmeTableInfo(org => {
          let obj = { ...org };
          if (!obj.throwAreaCards) {
            obj.throwAreaCards = { totalNumberOfCards: 0 };
          } else if (obj.throwAreaCards.totalNumberOfCards === 6) {
            obj.throwAreaCards.totalNumberOfCards = 2;
          } else {
            obj.throwAreaCards.totalNumberOfCards += 1;
          }
          return obj;
        });

        animateIfReady(
          true,
          restPropertiesAnimationDbs[player[randomPlayer]],
          centerTable,
          setFromP,
          setToP,
          setDisplayCardAnimaiton,
        );
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }, []),
  );

  return (
    <View style={style.div}>
      <Image
        source={require('@/assets/rummy.png')}
        onLayout={e => {
          const { width, height } = e.nativeEvent.layout;
          setContainerSize({ width, height });
        }}
        style={{
          flex: 1,
          justifyContent: 'start',
          paddingTop: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        resizeMode="contain"
      />
      <View
        style={{
          height: scaledImageSize.height,
          zIndex: 11,
          backgroundColor: 'rgba(1, 1, 1, 0.5)',
          position: 'absolute',
          width: scaledImageSize.width,
        }}
      ></View>
      {gameTableInfoState ? (
        gameTableInfoState.status === 304 ? (
          <CenterTable
            scaledImageSize={scaledImageSize}
            useAtomValue={false}
            valueOfContexts={gameTableInfoState}
          ></CenterTable>
        ) : null
      ) : null}

      {displayCardThrowAnimation ? (
        <AnimatedThrowCard
          toPos={toPostion}
          fromPos={formPostion}
        ></AnimatedThrowCard>
      ) : null}
      <View
        style={[
          style.child,
          scaledImageSize.width < 646 ? { bottom: '0%' } : {},
        ]}
      >
        {children}
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  child: {
    position: 'absolute',
    width: 200,
    height: 150,
    left: '50%',
    transform: [{ translateX: '-40%' }],
    zIndex: 12,
  },
});
