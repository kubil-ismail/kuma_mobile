/* eslint-disable prettier/prettier */
import React from 'react';
import { Header, Image } from 'react-native-elements';

export default function header() {
  return (
    <Header
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content" // or directly
      centerComponent={
        // eslint-disable-next-line react-native/no-inline-styles
        <Image source={require('../assets/image/logo.png')} style={{ width: 75, height: 35 }} />
      }
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
        backgroundColor: '#fff',
        justifyContent: 'space-around',
      }}
    />
  );
}
