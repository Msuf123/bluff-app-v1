import { useNavigation } from '@react-navigation/native';
import { useUserSignedIn } from '../../../../Hooks/useUserSignedIn';
import { Image, Pressable } from 'react-native';

export default function PorfileIcon() {
  const nav = useNavigation();
  const [loadingState, authApp] = useUserSignedIn();
  return (
    <Pressable
      style={{
        backgroundColor: 'rgb(167, 167, 167)',
        padding: 10,
        width: 60,
        zIndex: 13,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        top: 10,
        left: '100%',

        transform: [{ translateX: '-120%' }],
      }}
      onPressOut={() => {
        if (authApp) {
          nav.navigate('profile');
        } else {
          nav.navigate('login');
        }
      }}
    >
      <Image
        source={require('@/assets/user.png')}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      ></Image>
    </Pressable>
  );
}
