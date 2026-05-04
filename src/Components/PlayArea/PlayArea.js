import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  atHome,
  displayAnimation,
  formPostionOfCardAnimaitonThrow,
  playerGameArea,
  playersGameTableInfo,
  scroeBoard,
  toPostionOfCardAnimationThrow,
  webScoket,
} from '../../AppState/Atoms';
import { useAtom } from 'jotai';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';
import TopBar from './SubComponents/TopBar/TopBar';
import MicOption from '../SubComponents/MicOption/MicOption';
import CenterTable from '../SubComponents/CenterTable/CenterTable';
import AnimatedThrowCard from '../SubComponents/AnimateThrowCards/AnimateThrowCards';
import Spinner from '../SubComponents/Spinner/Spinner';
import ListPlayer from './SubComponents/ListPlayer/ListPlayer';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
export default function PlayArea() {
  const nav = useNavigation();
  const [loaidng, setLoading] = useState(true);
  const [scoreBoardBol, ss] = useAtom(scroeBoard);
  const [ws] = useAtom(webScoket);
  const [userInfo] = useAtom(playerGameArea);
  const orientationLocked = useRef(false);
  const [playersGameTableInfoState] = useAtom(playersGameTableInfo);
  const [atHOme, setAthOme] = useAtom(atHome);

  const [toPostion] = useAtom(toPostionOfCardAnimationThrow);
  const [formPostion] = useAtom(formPostionOfCardAnimaitonThrow);
  const [displayCardThrowAnimation, setDiaplayA] = useAtom(displayAnimation);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scaledImageSize, setScaledImageSize] = useState({
    width: 0,
    height: 0,
  });
  const originalImageSize = { width: 1920, height: 1080 };
  const lockToLandscape = () => {
    try {
      Orientation.lockToLandscape();
    } catch (err) {
      console.error('❌ Orientation lock error:', err);
    }
  };
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
  useEffect(() => {
    if (Platform.OS !== 'web') {
      lockToLandscape();
    }

    if (ws && userInfo.leader === userInfo.yourEmail) {
      ws.send(JSON.stringify({ action: 'getPlayGroundDetails' }));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error Connecting',
        text2: "Connection can't be found",
      });
    }
    return () => {
      if (ws) {
        ws.close('1000', 'jl');
      }
    };
  }, []);
  useEffect(() => {
    if (playersGameTableInfoState) {
      setLoading(false);
    }
    // else {
    //   //Testing only
    //   setLoading(false);
    // }
  }, [playersGameTableInfoState]);
  useEffect(() => {
    ss(false);

    return () => {
      //i am calling this so that i can call a callback at the home componet which will rotate screen to protrait
      setAthOme(org => !org);
    };
  }, [nav]);
  useEffect(() => {
    const beforeRemove = e => {
      e.preventDefault();
      nav.removeListener('beforeRemove', beforeRemove); // remove listener first
      nav.dispatch(StackActions.replace('home'));
    };

    nav.addListener('beforeRemove', beforeRemove);

    return () => nav.removeListener('beforeRemove', beforeRemove);
  }, []);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }} edges={['right']}>
        {!loaidng ? (
          <>
            <View style={style.div}>
              <TopBar></TopBar>
              <StatusBar hidden={true}></StatusBar>
              <View style={style.divTwo}>
                <View
                  style={{
                    position: 'absolute',
                    top: '70%',
                    left: '0%',
                    marginLeft: 10,
                    transform: [{ translateY: '0%' }],
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: 'gray',
                    marginLeft: 20,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <MicOption marginRightArg={5}></MicOption>
                </View>

                <Image
                  source={require('@/assets/rummy.png')}
                  onLayout={e => {
                    const { width, height } = e.nativeEvent.layout;
                    setContainerSize({ width, height });
                  }}
                  style={{
                    flex: 1,
                    paddingTop: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: 0,
                  }}
                  resizeMode="contain"
                />
                {playersGameTableInfoState ? (
                  <CenterTable
                    useAtomValue={true}
                    scaledImageSize={scaledImageSize}
                    valueOfContexts={playersGameTableInfoState}
                  ></CenterTable>
                ) : null}
              </View>

              {displayCardThrowAnimation ? (
                <AnimatedThrowCard
                  toPos={toPostion}
                  fromPos={formPostion}
                ></AnimatedThrowCard>
              ) : null}
            </View>
            {scoreBoardBol ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: 'rgba(20, 20, 20, 0.9)',
                }}
              >
                <ListPlayer></ListPlayer>
              </View>
            ) : null}
          </>
        ) : (
          <Spinner></Spinner>
        )}
      </SafeAreaView>
    </>
  );
}
const style = StyleSheet.create({
  div: {
    flex: 1,
    justifyContent: 'start',
    paddingTop: 0,
    backgroundColor: '',
    overflow: 'hidden',
  },
  divTwo: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});
