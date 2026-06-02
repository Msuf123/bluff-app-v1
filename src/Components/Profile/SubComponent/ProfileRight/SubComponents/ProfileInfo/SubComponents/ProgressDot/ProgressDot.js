import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProgressDot({ status }) {
  return (
    <View
      style={[
        { width: 15, height: 15, borderRadius: 50 },
        status === 'error'
          ? { backgroundColor: 'red', width: 15, height: 15, borderRadius: 50 }
          : {},
        status === 'processing'
          ? {
              backgroundColor: 'yellow',
              width: 15,
              height: 15,
              borderRadius: 50,
            }
          : {},
        status === 'success'
          ? {
              backgroundColor: 'green',
              width: 15,
              height: 15,
              borderRadius: 50,
            }
          : {},
        status === 'hide'
          ? {
              backgroundColor: 'transparent',
              width: 15,
              height: 15,
              borderRadius: 50,
            }
          : {},
      ]}
    ></View>
  );
}
const style = StyleSheet.create({
  div: {
    width: 15,
    height: 15,
    borderRadius: 50,

    display: 'flex',
  },
});
