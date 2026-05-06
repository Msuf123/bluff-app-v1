import { useCallback, useEffect, useRef, useState } from 'react';
import {
  atHome,
  micMediaStream,
  micStateGlobalPermission,
  peerConnectionDbs,
  webScoket,
} from '../../AppState/Atoms';
import { useAtom } from 'jotai';
import { StatusBar, View } from 'react-native';
import { useUserSignedIn } from '../../Hooks/useUserSignedIn';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import PorfileIcon from './SubComponent/ProfileIcon/ProfileIcon';
import Spinner from '../SubComponents/Spinner/Spinner';
import HomeBackGround from './SubComponent/HomeBackground/HomeBackground';
import UserRoomButtons from './SubComponent/UserRoomButtons/UserRoomButtons';
import JoinPopUp from './SubComponent/JoinPopUp/JoinPopUp';
import { cleanupPeerConnections } from '../../webRtc/SubFunctions/cleanUpVoiceCommunication';
import InCallManager from 'react-native-incall-manager';

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
  const pcStateConnectionDBsRef = useRef(pcStateConnectionDBs);
  useEffect(() => {
    wsRef.current = ws;
  }, [ws]);
  useEffect(() => {
    pcStateConnectionDBsRef.current = pcStateConnectionDBs;
  }, [pcStateConnectionDBs]);

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
      Orientation.lockToPortrait();
      if (wsRef.current) {
        wsRef.current.close();
        cleanupPeerConnections(pcStateConnectionDBsRef.current);
      }
      setPcStateDbs({});

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {loading ? null : true ? <PorfileIcon></PorfileIcon> : null}
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
          ></UserRoomButtons>
        </HomeBackGround>
      ) : (
        <></>
      )}
      {joinPopUp ? <JoinPopUp changeState={setJoinPopUp}></JoinPopUp> : <></>}
    </View>
  );
}
