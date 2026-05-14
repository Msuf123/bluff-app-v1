import { atom } from 'jotai';
import { lightTheme, powerSavingTheme } from './Theme';

export const authAtom = atom(false);
export const backendUrlAtom = atom('http://192.168.1.168:8001');
export const themeAtom = atom(powerSavingTheme);
export const webScoket = atom(null);
//playerGameArea is about playera and other things
export const playerGameArea = atom({
  players: [],
});
//it's abotu what card thrown and what cards you have
export const playersGameTableInfo = atom();
export const playerCardChooseOnGameTable = atom(false);
export const playerCardsArrayThatHeSelected = atom([]);
export const throwCardLabel = atom('');
export const throwCardsButtonStatus = atom(false);
export const scroeBoard = atom(false);
export const scorePlayer = atom(['akshat', 'james', 'nodii']);
export const authStateEmail = atom('');
export const authStateOtp = atom('XXXX');
export const atHome = atom(false);
export const centerTablePostion = atom();
export const userCardPostion = atom();
export const displayAnimation = atom();
export const toPostionOfCardAnimationThrow = atom();
export const formPostionOfCardAnimaitonThrow = atom();
export const prevUserCardPosition = atom(null);
export const updateUserCardPosition = atom(null, (get, set, newValue) => {
  const current = get(userCardPostion);
  set(prevUserCardPosition, current); // Store current as previous
  set(userCardPostion, newValue); // Update to new value
});
export const micState = atom(false);
export const micStateGlobalPermission = atom(false);
export const micLoading = atom(false);
export const peerConnectionDbs = atom({});
export const micMediaStream = atom();
export const remoteAudio = atom();
export const numberOfTimeGolobalPermissionClicked = atom(0);
export const deniedPermission = atom(false);
export const rtc = atom();
export const animationDbs = atom({});
export const remoteStreamAtom = atom(null);
export const iceConfig = atom({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
});
