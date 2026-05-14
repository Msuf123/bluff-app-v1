import { useAtom } from 'jotai';
import { themeAtom } from '../../../../AppState/Atoms';
import { Image, Pressable, Text, View } from 'react-native';
import Spinner from '../../../SubComponents/Spinner/Spinner';

export default function HomeJoinButtons({
  onClick,
  text,
  loading,
  setLoading,
  showImage,
  authStateLoading,
}) {
  const [theme] = useAtom(themeAtom);

  return (
    <Pressable
      onPress={() => {
        setLoading(true);

        if (typeof onClick === 'function') {
          setLoading(false);
          onClick();
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }}
      style={{
        backgroundColor: theme?.colors?.primary,
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderRadius: 8,
        alignItems: 'start',
        marginTop: 5,
        minWidth: 150,
      }}
    >
      <View
        style={[
          {
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
          },
        ]}
      >
        {!loading ? (
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            {text}
          </Text>
        ) : (
          <Spinner />
        )}
        {authStateLoading ? (
          <Spinner size={20} marginVal={10}></Spinner>
        ) : showImage ? (
          <Image
            source={require('@/assets/lock.png')}
            style={{
              width: 20,
              height: 20,
              marginLeft: 10,
              position: 'relative',
            }}
          ></Image>
        ) : null}
      </View>
    </Pressable>
  );
}
