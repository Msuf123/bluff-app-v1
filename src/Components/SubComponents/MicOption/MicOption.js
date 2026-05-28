import { getDefaultStore, useAtom } from 'jotai';
import {
  backendUrlAtom,
  deniedPermission,
  iceConfig,
  micLoading,
  micMediaStream,
  micState,
  micStateGlobalPermission,
  numberOfTimeGolobalPermissionClicked,
  peerConnectionDbs,
  playerGameArea,
  remoteAudio,
  remoteStreamAtom,
  themeAtom,
  webScoket,
} from '../../../AppState/Atoms';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Spinner from '../Spinner/Spinner';
import MicPermission from '../../../Functions/micPermission';
import makeOffer from '../../../webRtc/makeOffer';
import Toast from 'react-native-toast-message';

export default function MicOption({ marginRightArg }) {
  const [micStates, setMicState] = useAtom(micState);
  const store = getDefaultStore();
  const [theme] = useAtom(themeAtom);
  const [micLoadings, setMicLoading] = useAtom(micLoading);
  const [ices, setIces] = useAtom(iceConfig);
  const [urls] = useAtom(backendUrlAtom);
  const [micStream, setMicStreamState] = useAtom(micMediaStream);
  const [webScoketCon, setWebSocketCon] = useAtom(webScoket);
  const [_s, setRemoteStream] = useAtom(remoteStreamAtom);
  const [micMediaGlobalState, setMidiaGlobalState] = useAtom(
    micStateGlobalPermission,
  );
  const [peerConnectionDbsState, setPeerConnectionState] =
    useAtom(peerConnectionDbs);
  const [
    numberOfTimeGolobalPermissionClickedState,
    setNumberOfTimeGolobalPermissionClicked,
  ] = useAtom(numberOfTimeGolobalPermissionClicked);
  const [_, setMicOnOff] = useAtom(deniedPermission);
  useEffect(() => {
    if (micMediaGlobalState) {
      setMicState(true);
    } else {
      setMicState(false);
    }
  }, [micMediaGlobalState]);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        zIndex: 15,
        marginRight: marginRightArg ? marginRightArg : 0,
      }}
    >
      {micLoadings ? (
        <Spinner size={20}></Spinner>
      ) : (
        <Pressable
          onPressOut={() => {
            // setMicLoading(true);
            const peerConnectionDbsState = store.get(peerConnectionDbs);
            const datas = store.get(playerGameArea);
            const ices = store.get(iceConfig);
            const remoteAudios = store.get(remoteAudio);
            const ws = store.get(webScoket);
            const micOnOff = store.get(deniedPermission);
            setNumberOfTimeGolobalPermissionClicked(org => ++org);
            MicPermission(
              micMediaGlobalState,
              setMidiaGlobalState,
              numberOfTimeGolobalPermissionClickedState,
              setNumberOfTimeGolobalPermissionClicked,
              micStates,
              setMicState,
              setMicStreamState,
              micStream,
              micOnOff,
              setMicOnOff,
              () => {
                const id = setInterval(() => {
                  const micMediaStreamStatek = store.get(micMediaStream);
                  const peerConnectionDbsStateCurrent =
                    store.get(peerConnectionDbs);
                  if (micMediaStreamStatek) {
                    clearInterval(id);
                    makeOffer(
                      { data: datas },
                      ices,

                      micMediaStreamStatek,
                      peerConnectionDbsStateCurrent,
                      setPeerConnectionState,
                      Toast,
                      ws,
                      setMicLoading,
                      remoteAudios,
                      setRemoteStream,
                      true,
                    );
                  }
                }, 500);
              },
            );
            //here when the mic permission is given i also wants to establish the communicaiton agian
            //
          }}
        >
          {micStates ? (
            <Image
              source={require('@/assets/mic.png')}
              style={style.image}
            ></Image>
          ) : (
            <Image
              source={require('@/assets/mute.png')}
              style={style.image}
            ></Image>
          )}
        </Pressable>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    margin: 5,
  },
});
