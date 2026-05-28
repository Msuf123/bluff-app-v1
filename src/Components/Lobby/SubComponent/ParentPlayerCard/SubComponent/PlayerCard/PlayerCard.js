import { useRef, useState } from 'react';
import {
  playerGameArea,
  playersGameTableInfo,
  themeAtom,
  webScoket,
} from '../../../../../../AppState/Atoms';
import { useAtom } from 'jotai';
import gesture from './gesture';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ReadySatus from './SubComponent/ReadyStatus/ReadyStatus';
import MicOption from '../../../../../SubComponents/MicOption/MicOption';
import { imageUrl } from '../../../../../Home/homePlayerTableConstant';

export default function PlayerCard({ name, showBin, email, readySataus, url }) {
  const [roomDetails] = useAtom(playerGameArea);
  const [theme] = useAtom(themeAtom);

  const [ws] = useAtom(webScoket);

  return (
    <View style={[style.div, { backgroundColor: theme?.colors?.background }]}>
      <View
        style={[
          style.front,
          { zIndex: 2, backgroundColor: theme?.colors?.background },
        ]}
      >
        <Image
          resizeMode="contain"
          style={[style.img, style.profile]}
          source={{ uri: url ? url : imageUrl }}
        ></Image>
        <Text style={[style.name, { color: theme?.colors?.textPrimary }]}>
          {name.length > 12 ? name.slice(0, 11) + ' ...' : name}
        </Text>

        <ReadySatus boolVal={readySataus}></ReadySatus>
        {roomDetails.yourEmail !== email ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 5,
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              zIndex: 5,
              marginRight: 0,
            }}
          >
            <Image
              source={require('@/assets/speaker.png')}
              style={{ width: 20, height: 20, margin: 5 }}
            ></Image>
          </View>
        ) : (
          <MicOption></MicOption>
        )}
      </View>

      {roomDetails.leader === email ? (
        <Image
          style={[style.img, style.leader, { zIndex: 12 }]}
          source={require('@/assets/admin.png')}
          resizeMode="contain"
        ></Image>
      ) : showBin ? (
        <Pressable
          onPress={() => {
            ws.send(
              JSON.stringify({
                action: 'removeUserFromLobby',
                emailToKick: email,
              }),
            );
          }}
          style={[style.pressable]}
        >
          <Image
            style={style.imgBin}
            source={require('@/assets/bin.png')}
            resizeMode="contain"
          ></Image>
        </Pressable>
      ) : null}
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    position: 'relative',
    marginLeft: 0,
    marginRight: 0,
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 5, // Android shadow
    alignSelf: 'center',
    maxWidth: 550,
    width: '98%',
    backgroundColor: '#FFFFFF',
  },

  img: {
    width: 100,
    height: 100,
  },

  profile: {
    borderRadius: 200,
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 5,
  },

  leader: {
    width: '10%',
    height: '40%',

    marginRight: 10,
    position: 'absolute',
    top: 20,
    right: 10,
    width: 30,
    height: 30,
    zIndex: 10,
  },

  front: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  overlap: {
    position: 'absolute',
    width: 0,
    height: '100%',
    zIndex: 2,
  },

  name: {
    fontSize: 19,
  },
  pressable: {
    display: 'flex',
    zIndex: 12,
    width: 'auto',
    padding: 2,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBin: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
