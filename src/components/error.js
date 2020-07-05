/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {Image, Text} from 'react-native-elements';

export default function error() {
  return (
    <View style={styles.center}>
      <Image
        source={require('../assets/image/undraw_Taken_if77.png')}
        style={styles.svg}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text>Can't get data from server</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  svg: {
    width: 250,
    height: 200,
    marginVertical: 30,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
