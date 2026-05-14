import { useEffect, useState } from 'react';
import { backendUrlAtom, remoteAudio } from '../../../../AppState/Atoms';
import { useAtom } from 'jotai';
import { useUserSignedIn } from '../../../../Hooks/useUserSignedIn';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import HomeJoinButtons from '../HomeJoinButtons/HomeJoinButtons';
import { initRemoteAudio } from '../../../../webRtc/SubFunctions/initRemoteAudio';

export default function UserRoomButtons({
  popup,
  setPopUp,
  authState,
  authStateLoading,
}) {
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoaidngTwo] = useState(false);
  const [parentUrl] = useAtom(backendUrlAtom);
  //const [loadingState, authApp] = useUserSignedIn();
  const [audio, ss] = useAtom(remoteAudio);
  const nav = useNavigation();
  useEffect(() => {
    if (audio && Platform.OS === 'web') {
      audio.muted = false;
      audio.play().catch(e => console.error('Play failed:', e));
    }
  }, [audio]); // runs once the audio element is set

  return (
    <View style={[style.div, Platform.OS == 'web' ? { paddingTop: '5%' } : {}]}>
      <HomeJoinButtons
        text={'Join'}
        loading={loadingOne}
        setLoading={setLoadingOne}
        showImage={!authState}
        authStateLoading={authStateLoading}
        onClick={() => {
          setLoadingOne(true);
          if (authState) {
            setPopUp(true);
            setLoadingOne(false);
            initRemoteAudio(ss);
          } else {
            nav.navigate('login');
            setLoadingOne(false);
          }
        }}
      ></HomeJoinButtons>
      <HomeJoinButtons
        text={'Create'}
        loading={loadingTwo}
        setLoading={setLoaidngTwo}
        showImage={!authState}
        authStateLoading={authStateLoading}
        onClick={() => {
          if (authState) {
            nav.navigate('Lobby');
            initRemoteAudio(ss);
          } else {
            nav.navigate('login');
          }
        }}
      ></HomeJoinButtons>
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    justifyContent: 'start',
    alignItems: 'center',
    width: 150,
    height: 'max-content',
    backgroundColor: 'transparent',
  },
});
