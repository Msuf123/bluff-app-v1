import { getDefaultStore, useAtom } from 'jotai';
import {
  animationDbs,
  atHome,
  authAtom,
  backendUrlAtom,
  backgroundMusicSound,
  deniedPermission,
  displayAnimation,
  formPostionOfCardAnimaitonThrow,
  iceConfig,
  micLoading,
  micMediaStream,
  micState,
  micStateGlobalPermission,
  numberOfTimeGolobalPermissionClicked,
  peerConnectionDbs,
  playerCardChooseOnGameTable,
  playerCardsArrayThatHeSelected,
  playerGameArea,
  playersGameTableInfo,
  remoteAudio,
  remoteStreamAtom,
  scorePlayer,
  scroeBoard,
  themeAtom,
  throwCardsButtonStatus,
  toPostionOfCardAnimationThrow,
  webScoket,
} from '../../AppState/Atoms';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { animateIfReady } from '../Home/SubComponent/HomeBackground/animateIfReady';
import Toast from 'react-native-toast-message';
import { Platform, StyleSheet, View } from 'react-native';
import RoomInfo from './SubComponent/RoomInfo/RoomInfo';
import ParentPlayerCard from './SubComponent/ParentPlayerCard/ParentPlayerCard';
import ReadyButton from './SubComponent/ParentPlayerCard/SubComponent/ReadyButton/ReadyButton';
import Spinner from '../SubComponents/Spinner/Spinner';
import * as Keychain from 'react-native-keychain';
import MicPermission from '../../Functions/micPermission';
import makeOffer from '../../webRtc/makeOffer';
import answerOffer from '../../webRtc/answerOffer';
import handelIncommingAnswer from '../../webRtc/inCommingAnswer';
import handelIcesOffer from '../../webRtc/iceOffer';
import { RTCView } from 'react-native-webrtc';
import { SafeAreaView } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
export default function Lobby() {
  const store = getDefaultStore();
  const [webScoketCon, setWebSocketCon] = useAtom(webScoket);
  const [connectionEstablised, setConnectionEstablishd] = useState(false);
  const [urls] = useAtom(backendUrlAtom);
  const [authS, setAuth] = useAtom(authAtom);
  const [playerTableInfoState, setPlayerTableInfo] =
    useAtom(playersGameTableInfo);
  const [cardChooseSatate, setCardChoose] = useAtom(
    playerCardChooseOnGameTable,
  );
  const [playerGameAreaState, setPlayerGameArea] = useAtom(playerGameArea);
  const [micLoadingState, setMicLoadingState] = useAtom(micLoading);
  const [throwCard, setThrowCards] = useAtom(playerCardsArrayThatHeSelected);
  const nav = useNavigation();

  const router = useRoute();
  const type = router.params;
  const wss = useRef();
  const [thorwCardButton, setThrowCArdButton] = useAtom(throwCardsButtonStatus);
  const playerTableInfoRef = useRef(playerTableInfoState);
  const [scroeBoardDisplay, setScoreBoardDisplay] = useAtom(scroeBoard);
  const [playerScoreOrder, setPlayerScoreOrder] = useAtom(scorePlayer);
  const [top, setToP] = useAtom(toPostionOfCardAnimationThrow);
  const [_, setFromP] = useAtom(formPostionOfCardAnimaitonThrow);
  const [_ices, setIces] = useAtom(iceConfig);
  const [dispalyA, setDiaplayA] = useAtom(displayAnimation);
  const [micStates, setMicState] = useAtom(micState);
  const [atHOme, setAthOme] = useAtom(atHome);
  const [peerConnectionDbsState, setPeerConnectionState] =
    useAtom(peerConnectionDbs);
  const [remoteStream, setRemoteStream] = useState(null);

  const [micMediaStreams, setMicMediaStreamState] = useAtom(micMediaStream);
  const [micStateGloablPermissions, setMicStateGlobalPermission] = useAtom(
    micStateGlobalPermission,
  );
  const [_s, setMicOnOffDeniedState] = useAtom(deniedPermission);
  const [
    numberOfTimeGolobalPermissionClickedState,
    setNumberOfTimeGolobalPermissionClicked,
  ] = useAtom(numberOfTimeGolobalPermissionClicked);
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    playerTableInfoRef.current = playerTableInfoState;
  }, [playerTableInfoState]);

  useEffect(() => {
    let webScoket = null;
    function createRoom(parentUrl, token, nav) {
      let url = (
        parentUrl +
        '/room?action=create&platform=' +
        Platform.OS +
        '&token=' +
        token
      ).replace('http', 'ws');
      if (type) {
        if (type.action === 'join') {
          url = (
            parentUrl +
            '/room?action=join&platform=' +
            Platform.OS +
            '&token=' +
            token +
            '&roomNumber=' +
            type.roomNumber
          ).replace('http', 'ws');
        }
      }

      webScoket = new WebSocket(url);

      setWebSocketCon(webScoket);
      wss.current = webScoket;
      webScoket.onopen = () => {
        const keepAlive = setInterval(() => {
          if (wss.current?.readyState === WebSocket.OPEN) {
            wss.current.send(JSON.stringify({ action: 'ping' }));
          }
        }, 30000);
        wss.keepAlive = keepAlive;
      };
      webScoket.onclose = () => {
        if (wss.keepAlive) {
          clearInterval(wss.keepAlive);
          wss.keepAlive = null;
        }
      };
      webScoket.onmessage = e => {
        let data = JSON.parse(e.data);

        const micMediaStreamState = store.get(micMediaStream); //add stream here
        const ices = store.get(iceConfig);
        const pcDbs = store.get(peerConnectionDbs);
        const remoteAudios = store.get(remoteAudio);
        const { table: centerTable, ...restPropertiesAnimationDbs } =
          store.get(animationDbs);
        setThrowCArdButton(false);

        if (data.status === 201 || data.status === 202) {
          setPlayerGameArea(data.data);

          setConnectionEstablishd(true);

          if (data.status == 202) {
            const micMediaStreamStatek = store.get(micMediaStream);
            const peerConnectionDbsStateCurrent = store.get(peerConnectionDbs);

            makeOffer(
              data,
              ices,
              micMediaStreamStatek,
              peerConnectionDbsStateCurrent,
              setPeerConnectionState,
              Toast,
              webScoket,
              setMicLoadingState,
              remoteAudios,
              setRemoteStream,
              false,
            );
          }
        }
        if (data.status === 2021) {
          setPlayerGameArea(data.data);
          const latestPlayers = data.data.players || [];
          const latestEmails = latestPlayers.map(player => player.email);
          const peerConnectionDbsStateCurrent = store.get(peerConnectionDbs);
          const updatedPcState = { ...peerConnectionDbsStateCurrent };
          Object.keys(peerConnectionDbsStateCurrent).forEach(email => {
            if (!latestEmails.includes(email)) {
              const pc = peerConnectionDbsStateCurrent[email];
              if (pc) {
                try {
                  pc.onicecandidate = null;
                  pc.ontrack = null;
                  pc.onconnectionstatechange = null;

                  pc.close();
                } catch (err) {
                  console.error('Error closing peer connection:', err);
                }
                delete updatedPcState[email];
              }
            }
          });
          setPeerConnectionState(updatedPcState);

          setConnectionEstablishd(true);
        }
        if (data.status === 1019) {
          //hadnle the incomming offer accordinly tell me steps what'as happening

          const micMediaStreamStatek = store.get(micMediaStream);
          const existing = store.get(peerConnectionDbs)[data.from];
          if (existing && existing.signalingState !== 'closed') {
            existing._replaced = true;
            existing.close();
          }

          answerOffer(
            ices,
            data,
            store,
            micMediaStreamStatek,
            webScoket,
            setPeerConnectionState,
            playerGameArea,
            remoteAudios,
            setMicLoadingState,
            setRemoteStream,
          );
        }
        if (data.status === 1020) {
          handelIncommingAnswer(Platform, data, pcDbs);
        }
        if (data.status === 1021) {
          handelIcesOffer(Platform, data, pcDbs);
        }

        if (data.status === 203) {
          setPlayerGameArea(org => ({
            ...org,
            players: [...data.data],
          }));
        }
        if (data.status === 300) {
          nav.navigate('PlayTabel');
        }
        if (data.status === 301) {
          setPlayerTableInfo(data);

          if (data.yourName === data.currentPlayer) {
          } else {
            setCardChoose(false);
          }
        }
        if (data.status === 302) {
          setPlayerTableInfo(org => ({ ...org, ...data.data }));
        }
        if (data.status === 1013) {
          setThrowCards([]);
          const personWhoThrewTheCards =
            data.data.throwAreaCards.playerWhoThrewLatestCard;
          if (data.data.animation) {
            setTimeout(() => {
              setPlayerTableInfo(org => ({
                ...org,
                throwAreaCards: data.data.throwAreaCards,
                currentPlayer: data.data.nextPlayer,
                cards: data.data.hasOwnProperty('remainingCards')
                  ? data.data.remainingCards
                  : org?.cards ?? [],
              }));
            }, 700);
          } else {
            setPlayerTableInfo(org => ({
              ...org,
              throwAreaCards: data.data.throwAreaCards,
              currentPlayer: data.data.nextPlayer,
              cards: data.data.hasOwnProperty('remainingCards')
                ? data.data.remainingCards
                : org?.cards ?? [],
            }));
          }

          if (data.data.animation) {
            animateIfReady(
              true,
              restPropertiesAnimationDbs[personWhoThrewTheCards],
              centerTable,
              setFromP,
              setToP,
              setDiaplayA,
            );
          }
          if (playerTableInfoRef.current.yourName !== data.data.nextPlayer) {
            setCardChoose(false);
          }
        }
        if (data.status === 1014) {
          setPlayerTableInfo(org => ({
            ...org,
            throwAreaCards: { ...org.throwAreaCards, totalNumberOfCards: 0 },
          }));
          setTimeout(() => {
            setPlayerTableInfo(org => ({
              ...org,
              throwAreaCards: data.data.throwAreaCards,
              currentPlayer: data.data.nextPlayer,
              cards: data.data.hasOwnProperty('remainingCards')
                ? data.data.remainingCards
                : org?.cards ?? [],
            }));
          }, 700);
          const allStateForPlyersLobby = store.get(playerGameArea);
          const yourEmailID = allStateForPlyersLobby.yourEmail;
          if (!data.data.isBluff) {
            if (yourEmailID === data.data.personWhoCalledShow) {
              Toast.show({
                type: 'info',
                text1: 'Cards were correct you receive all the cards',
              });
            } else {
              animateIfReady(
                false,
                restPropertiesAnimationDbs[data.data.personWhoCalledShow],
                centerTable,
                setFromP,
                setToP,
                setDiaplayA,
              );
            }
          } else {
            //only show animaiton to the user who'e card were not the latest
            //thre person who threw the cards can't see this animaiton

            if (data.data.animation) {
              if (data.data.isBluff) {
                //user has lied so sending all the cards to previous email
                if (
                  data.data.hasOwnProperty('userLeft') &&
                  data.data.userLeft !== null
                ) {
                  Toast.show({
                    type: 'info',
                    text1: `${data.data.userLeft} left the game`,
                    text2: 'Cards were wrong throwing out of table',
                  });
                  playersGameTableInfo;
                } else {
                  animateIfReady(
                    false,
                    restPropertiesAnimationDbs[
                      data.data.previousPlayerWhoThrewTheCards
                    ],
                    centerTable,
                    setFromP,
                    setToP,
                    setDiaplayA,
                  );
                }
              }
            } else {
              Toast.show({
                text1: 'You receive all cards',
                text2: 'They were incorrect',
                type: 'info',
              });
            }
          }
        }
        if (data.status === 1016) {
          setPlayerTableInfo(org => ({
            ...org,
            throwAreaCards: data.data.throwAreaCards,
            currentPlayer: data.data.nextPlayer,
            cards: data.data.hasOwnProperty('remainingCards')
              ? data.data.remainingCards
              : org?.cards ?? [],
          }));
        }

        if (data.status === 1017) {
          Toast.show({
            type: 'success',
            text1: data.data.msg,
          });
        }
        if (data.status === 1015) {
          Toast.show({
            type: 'error',
            text1: data.data.msg,
            text2: data.data.msgTwo,
          });
        }
        if (data.status === 1012) {
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Try agian later',
          });
        }
        if (data.status === 1018) {
          //means match has ended

          setScoreBoardDisplay(true);
          setPlayerScoreOrder(data.data.playerWinOrder);
        }
        if (data.status === 1022) {
          setPlayerGameArea(org => ({
            ...org,
            players: data.data,
          }));
        }
        if (data.status === 1024) {
          nav.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'home' }],
            }),
          );
          Toast.show({
            type: 'info',
            text1: 'Removed',
            text2: 'Leader removed you form lobby',
          });
        }
        if (data.status === 1025) {
        }
        if (data.status === 1023) {
          Toast.show({
            type: 'info',
            text1: 'Match ended',
            text2: 'Other player has left',
          });
          setTimeout(() => {
            nav.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'home' }],
              }),
            );
          }, 2000);
        }
        webScoket.onerror = ev => {
          Toast.show({
            type: 'error',
            text1: 'Unable to reach Server',
            text2: 'Please try again later',
          });
          nav.replace('home');
        };
      };
      webScoket.onclose = ev => {
        if (ev.reason === 'Opponent player left') {
          Toast.show({
            type: 'info',
            text1: 'All players left the game room',
            text2: 'Match has ended',
          });
          nav.replace('home');
        }
        if (ev.code === 1002) {
          Toast.show({
            type: 'error',
            text1: "Can't create room",
            text2: 'Please try again later',
          });
        }
        if (ev.code === 1008) {
          Toast.show({
            type: 'error',
            text1: 'You are not logged-in',
            text2: 'Try logging in agian and retry',
          });
          setAuth(false);
        }
      };
    }
    Keychain.getGenericPassword().then(credentials => {
      let token = null;
      if (Platform.OS !== 'web') {
        if (credentials) {
          token = credentials.password; // assuming token is stored as password
        } else {
        }
      } else {
        token = null;
      }
      createRoom(urls, token, nav);
    });

    setPlayerTableInfo(null);
    return () => {
      //i am calling this so that i can call a callback at the home componet which will rotate screen to protrait
      setAthOme(org => !org);
    };
  }, []);
  useEffect(() => {
    const micStateGloablPermissionss = store.get(micStateGlobalPermission);
    const numberOfTimeGolobalPermissionClickedState = store.get(
      numberOfTimeGolobalPermissionClicked,
    );
    const micStates = store.get(micState);
    const micStreamState = store.get(micMediaStream);
    const micOffOn = store.get(deniedPermission);
    const lockToLandscape = () => {
      try {
        Orientation.lockToPortrait();
      } catch (err) {
        console.error('❌ Orientation lock error:', err);
      }
    };
    lockToLandscape();
    setTimeout(() => {
      MicPermission(
        micStateGloablPermissionss,
        setMicStateGlobalPermission,
        numberOfTimeGolobalPermissionClickedState,
        setNumberOfTimeGolobalPermissionClicked,
        micStates,
        setMicState,
        setMicMediaStreamState,
        micStreamState,
        micOffOn,
        setMicOnOffDeniedState,
      );
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      {connectionEstablised ? (
        <View
          style={[style.div, { backgroundColor: theme.colors.lobbyBackground }]}
        >
          <RoomInfo></RoomInfo>
          <ParentPlayerCard></ParentPlayerCard>
          <ReadyButton webScoket={wss.current}></ReadyButton>
          {remoteStream && (
            <RTCView
              streamURL={remoteStream.toURL()}
              style={{ width: 0, height: 0 }} // hidden, audio only
            />
          )}
        </View>
      ) : (
        <View
          style={[
            style.div,
            {
              backgroundColor: theme.colors.lobbyBackground,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Spinner></Spinner>
        </View>
      )}
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  div: {
    flex: 1,
  },
});
