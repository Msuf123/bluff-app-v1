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
  useFocusEffect,
  useNavigation,
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
  const soundPositionRef = useRef(0);

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
      } else if (nextAppState === 'active') {
        soundBackgroundMusic.play();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.action === 'join') {
        // ✅ Clear params first, then navigate
        nav.setParams({ action: undefined, roomNumber: undefined });
        nav.navigate('Lobby', {
          roomNumber: route.params.roomNumber,
          action: 'join',
        });
      }
    }, [route.params]),
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
        Orientation.unlockAllOrientations();
      };
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      // Load and play music when home screen is focused
      if (loading) {
        return;
      }
      console.log(
        'here soundBackgroundMusic value is ',
        soundBackgroundMusic ? 1 : null,
      );
      if (soundBackgroundMusic) {
        soundBackgroundMusic.setVolume(isMuted ? 0.0 : 1.0);
        soundBackgroundMusic.play();
      } else {
        console.log('new sound added');
        const music = new Sound(
          'background_music.mp3',
          Sound.MAIN_BUNDLE,
          error => {
            if (error) {
              console.log('Failed to load sound', error);
              return;
            }
            music.setNumberOfLoops(-1);
            music.setVolume(1.0);

            music.play();
          },
        );

        setSoundBackgroundMusic(music);
      }
      // Stop music when leaving home screen
      return () => {
        console.log('runnign', soundBackgroundMusic);
        if (soundBackgroundMusic) {
          soundBackgroundMusic.pause();
        }
      };
    }, [loading, soundBackgroundMusic, isMuted]),
  );
  const toggleMute = () => {
    if (!soundBackgroundMusic) return;

    if (isMuted) {
      soundBackgroundMusic.setVolume(1.0); // Unmute
    } else {
      soundBackgroundMusic.setVolume(0.0); // Mute
    }
    setIsMuted(!isMuted);
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
