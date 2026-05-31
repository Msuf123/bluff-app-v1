import { useCallback, useEffect, useRef, useState } from 'react';
import {
  atHome,
  micMediaStream,
  micStateGlobalPermission,
  peerConnectionDbs,
  playerGameArea,
  playersGameTableInfo,
  throwCardLabel,
  webScoket,
} from '../../AppState/Atoms';
import { useAtom } from 'jotai';
import { StatusBar, View } from 'react-native';
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
  useEffect(() => {
    wsRef.current = ws;
  }, [ws]);
  useEffect(() => {
    pcStateConnectionDBsRef.current = pcStateConnectionDBs;
  }, [pcStateConnectionDBs]);

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

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View
        style={{
          flex: 1,
        }}
      >
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
