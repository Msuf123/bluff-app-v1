import { PanResponder } from 'react-native';
export default function gesture(width, setWidth, ref) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      //change color
    },
    onPanResponderMove: event => {
      //tracks user finger
      const postion = event.nativeEvent;
      setWidth(postion.locationX);
      //console.log("hello",postion.locationX)
    },
    onPanResponderRelease: event => {
      //send signal to backend to remove friend
      //
    },
  });
}
