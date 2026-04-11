import { atom } from "jotai";
import { powerSavingTheme } from "./Theme";

export const authAtom = atom(false);
export const backendUrlAtom = atom(
  "http://192.168.1.168:8001"
);
export const themeAtom = atom(powerSavingTheme);
export const webScoket = atom(null);
export const playerGameArea = atom({
  players:[ { email: "kk", readyStatus: false, name: "123456789 1234", image: "ksk" },
  { email: "kks", readyStatus: false, name: "Akshat", image: "ksk" },
]
}
 );
export const playersGameTableInfo = atom({
  throwAreaCards: { totalNumberOfCards: 2 },
});
export const playerCardChooseOnGameTable = atom(false);
export const playerCardsArrayThatHeSelected = atom([]);
export const throwCardLabel = atom("");
export const throwCardsButtonStatus = atom(false);
export const scroeBoard = atom(false);
export const scorePlayer = atom([]);
export const authStateEmail = atom("");
export const authStateOtp = atom("XXXX");
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
export const iceConfig = atom({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
});