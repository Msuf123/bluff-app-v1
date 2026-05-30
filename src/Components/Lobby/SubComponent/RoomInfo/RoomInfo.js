import { useAtom } from 'jotai';
import {
  backendUrlAtom,
  playerGameArea,
  themeAtom,
} from '../../../../AppState/Atoms';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
export default function RoomInfo() {
  const [roomDetails] = useAtom(playerGameArea);
  const [theme] = useAtom(themeAtom);
  const [url] = useAtom(backendUrlAtom);
  const handleCopy = useCallback(() => {
    let roomId = roomDetails.room;
    if (!roomId) return;
    Clipboard.setString(String(roomId));
  }, [roomDetails.room]);
  const share = useCallback(() => {
    if (!roomDetails.room) return;
    const shareLink = `${url}/redirect?roomNumber=${roomDetails.room}`;
    Share.share({
      message: `Join my room! Tap to open: ${shareLink}`,
      title: 'Join My Lobby',
    });
  }, [roomDetails.room]);
  return (
    <View style={[style.div, { backgroundColor: theme?.colors?.background }]}>
      <Pressable
        onPressIn={() => {
          handleCopy();
        }}
      >
        <Text style={[style.text, { color: theme?.colors?.textPrimary }]}>
          Room number: {roomDetails ? roomDetails.room : null}
        </Text>
      </Pressable>
      <Pressable
        onPressIn={() => {
          share();
        }}
        style={{ marginRight: 10 }}
      >
        <Text style={{ fontSize: 18, marginRight: 8 }}>🔗</Text>
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    backgroundColor: 'white',
    width: '90%',
    margin: 'auto',
    height: 50,
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 5,
    boxShadow: '0 0 13 1 rgba(49, 49, 49, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
});
