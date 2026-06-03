import { useCallback, useEffect, useRef, useState } from 'react';
import {
  atHome,
  backgroundMusicIsMuted,
  backgroundMusicSound,
  micMediaStream,
  micStateGlobalPermission,
  peerConnectionDbs,
  playerGameArea,
  playersGameTableInfo,
  throwCardLabel,
  webScoket,
} from '../../AppState/Atoms';
import { useAtom } from 'jotai';
import {
  AppState,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUserSignedIn } from '../../Hooks/useUserSignedIn';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import PorfileIcon from './SubComponent/ProfileIcon/ProfileIcon';
import Spinner from '../SubComponents/Spinner/Spinner';
import HomeBackGround from './SubComponent/HomeBackground/HomeBackground';
import UserRoomButtons from './SubComponent/UserRoomButtons/UserRoomButtons';
import JoinPopUp from './SubComponent/JoinPopUp/JoinPopUp';
import { cleanupPeerConnections } from '../../webRtc/SubFunctions/cleanUpVoiceCommunication';
import InCallManager from 'react-native-incall-manager';
import {
  defaultState,
  playerGameAreaConstantHome,
} from './homePlayerTableConstant';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';

export default function Home() {
  const [joinPopUp, setJoinPopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayLobby, stateAuth] = useUserSignedIn();
  const [atHOme] = useAtom(atHome);
  const [ws] = useAtom(webScoket);
  const [pcStateConnectionDBs, setPcStateDbs] = useAtom(peerConnectionDbs);
  const [micMediaStreamState, micMediaStreamStateSet] = useAtom(micMediaStream);
  const [micStateGloablPermissions, setMicStateGlobalPermission] = useAtom(
    micStateGlobalPermission,
  );
  const wsRef = useRef(ws);
  const [_3, setThrowCardLabel] = useAtom(throwCardLabel);
  const pcStateConnectionDBsRef = useRef(pcStateConnectionDBs);
  const [_, setPlayerTable] = useAtom(playerGameArea);
  const [_2, setGameTableInfo] = useAtom(playersGameTableInfo);
  const nav = useNavigation();
  const route = useRoute();
  const [isMuted, setIsMuted] = useAtom(backgroundMusicIsMuted);
  const [soundBackgroundMusic, setSoundBackgroundMusic] =
    useAtom(backgroundMusicSound);
  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );
  const loadingRef = useRef(loading);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  useEffect(() => {
    wsRef.current = ws;
  }, [ws]);
  useEffect(() => {
    pcStateConnectionDBsRef.current = pcStateConnectionDBs;
  }, [pcStateConnectionDBs]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (!soundBackgroundMusic) return;

      if (nextAppState === 'background' || nextAppState === 'inactive') {
        soundBackgroundMusic.pause();
        console.log('in avie out csreen');
      } else if (nextAppState === 'active') {
        if (currentRouteName === 'home') {
          soundBackgroundMusic.play();
          console.log('playing msuyicn ineven tliner');
        } else {
          console.log('paued in litner');
          soundBackgroundMusic.pause();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [currentRouteName, soundBackgroundMusic]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.action === 'join') {
        nav.setParams({ action: undefined, roomNumber: undefined });

        // ✅ Reset stack so there's no history duplication
        nav.reset({
          index: 1,
          routes: [
            { name: 'home' },
            {
              name: 'Lobby',
              params: {
                roomNumber: route.params.roomNumber,
                action: 'join',
              },
            },
          ],
        });
      }
    }, [route.params?.action, route.params?.roomNumber]), // ✅ specific deps, not whole object
  );
  useEffect(() => {
    setLoading(displayLobby);
  }, [displayLobby]);
  useEffect(() => {
    if (micMediaStreamState) {
      micMediaStreamState.getTracks().forEach(track => track.stop());
      micMediaStreamStateSet(null);
    }

    setMicStateGlobalPermission(false);
  }, [atHOme]);
  useEffect(() => {
    if (
      !loading &&
      soundBackgroundMusic &&
      AppState.currentState === 'active' &&
      currentRouteName === 'home'
    ) {
      console.log('plain in use effect');
      soundBackgroundMusic.play();
    }
  }, [loading, soundBackgroundMusic, currentRouteName]);

  useFocusEffect(
    useCallback(() => {
      setPlayerTable(playerGameAreaConstantHome);
      setGameTableInfo(defaultState);
      setThrowCardLabel('');
      Orientation.lockToPortrait();
      if (wsRef.current) {
        wsRef.current.close();
        cleanupPeerConnections(pcStateConnectionDBsRef.current);
      }
      setPcStateDbs({});

      return () => {
        // setPlayerTable(null);
        // setGameTableInfo(null);
        //  Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      // On focus — create only if doesn't exist yet

      setSoundBackgroundMusic(prev => {
        if (prev) {
          if (AppState.currentState === 'active') {
            prev.play();
            console.log('Playing in useFous');
          }

          return prev;
        }

        // First time only — create it
        const music = new Sound(
          'background_music.mp3',
          Sound.MAIN_BUNDLE,
          error => {
            if (error) return;
            music.setNumberOfLoops(-1);
            music.setVolume(isMuted ? 0 : 1);
            if (!loadingRef.current && AppState.currentState === 'active') {
              music.play();
            }
          },
        );

        return music;
      });

      return () => {
        // On blur — just pause, don't release or null it

        setSoundBackgroundMusic(prev => {
          if (prev) {
            console.log('Puased in usefous');
            prev.pause();
          } // ✅ keep the instance alive in atom
          return prev;
        });
      };
    }, [isMuted, loading, currentRouteName]),
  );

  const toggleMute = () => {
    if (!soundBackgroundMusic) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);

    soundBackgroundMusic.setVolume(newMuted ? 0 : 1);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View
        style={{
          flex: 1,
        }}
      >
        {loading ? null : (
          <TouchableOpacity
            onPress={toggleMute}
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 999,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: 24,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 22 }}>{isMuted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity>
        )}
        {loading ? null : stateAuth ? <PorfileIcon></PorfileIcon> : null}
        {loading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Spinner></Spinner>
          </View>
        ) : (
          <></>
        )}
        {!loading ? (
          <HomeBackGround>
            <UserRoomButtons
              setPopUp={setJoinPopUp}
              popup={setJoinPopUp}
              authState={stateAuth}
              authStateLoading={displayLobby}
            ></UserRoomButtons>
          </HomeBackGround>
        ) : (
          <></>
        )}
        {joinPopUp ? <JoinPopUp changeState={setJoinPopUp}></JoinPopUp> : <></>}
      </View>
    </SafeAreaView>
  );
}
