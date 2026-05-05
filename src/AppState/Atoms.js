import { atom } from 'jotai';
import { lightTheme, powerSavingTheme } from './Theme';

export const authAtom = atom(false);
export const backendUrlAtom = atom('http://192.168.1.168:8001');
export const themeAtom = atom(powerSavingTheme);
export const webScoket = atom(null);
export const playerGameArea = atom({
  players: [],
});
export const playersGameTableInfo = atom({
  status: 301,

  opponentDetails: [
    {
      opponentName: 'xrobo17@gmail.com',

      opponentCards: 26,
    },

    {
      opponentName: 'xrobo17@gmail.com',

      opponentCards: 26,
    },
  ],

  throwAreaCards: {
    totalNumberOfCards: 0,

    currentNumberOfCards: 0,

    playerWhoThrewLatestCard: null,

    cardLable: '',
  },

  currentPlayer: 'xrobo17@gmail.com',

  cards: [
    {
      value: '6',

      group: 'spade',

      name: '6Ofspade',
    },

    {
      value: 'q',

      group: 'club',

      name: 'qOfclub',
    },

    {
      value: '3',

      group: 'spade',

      name: '3Ofspade',
    },

    {
      value: 'j',

      group: 'heart',

      name: 'jOfheart',
    },

    {
      value: '4',

      group: 'heart',

      name: '4Ofheart',
    },

    {
      value: '9',

      group: 'spade',

      name: '9Ofspade',
    },

    {
      value: '5',

      group: 'heart',

      name: '5Ofheart',
    },

    {
      value: '4',

      group: 'club',

      name: '4Ofclub',
    },

    {
      value: '7',

      group: 'club',

      name: '7Ofclub',
    },

    {
      value: '6',

      group: 'heart',

      name: '6Ofheart',
    },

    {
      value: '8',

      group: 'club',

      name: '8Ofclub',
    },

    {
      value: 'k',

      group: 'diamond',

      name: 'kOfdiamond',
    },

    {
      value: '7',

      group: 'diamond',

      name: '7Ofdiamond',
    },

    {
      value: '6',

      group: 'club',

      name: '6Ofclub',
    },

    {
      value: '8',

      group: 'spade',

      name: '8Ofspade',
    },

    {
      value: '2',

      group: 'spade',

      name: '2Ofspade',
    },

    {
      value: 'j',

      group: 'spade',

      name: 'jOfspade',
    },

    {
      value: '4',

      group: 'diamond',

      name: '4Ofdiamond',
    },

    {
      value: '8',

      group: 'diamond',

      name: '8Ofdiamond',
    },

    {
      value: '9',

      group: 'club',

      name: '9Ofclub',
    },

    {
      value: '10',

      group: 'diamond',

      name: '10Ofdiamond',
    },

    {
      value: 'q',

      group: 'heart',

      name: 'qOfheart',
    },

    {
      value: '6',

      group: 'diamond',

      name: '6Ofdiamond',
    },

    {
      value: 'k',

      group: 'heart',

      name: 'kOfheart',
    },

    {
      value: '3',

      group: 'diamond',

      name: '3Ofdiamond',
    },

    {
      value: 'k',

      group: 'spade',

      name: 'kOfspade',
    },
  ],

  yourName: 'akshatmalik18t@gmail.com',
});
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
