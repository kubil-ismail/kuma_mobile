/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, View, ScrollView, StyleSheet} from 'react-native';
import { Button, Image, Text  } from 'react-native-elements';

import svg from '../../assets/image/undraw_book_lover_mkck.png';
import store from 'store2';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    if (store('login')) {
      this.props.navigation.navigate('home');
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={svg}
            style={styles.svg}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text h1 style={styles.h1}>Kuma Book</Text>
          <Text style={styles.p}>The world's largest novel and manga wikipedia and database 100% free</Text>
          <Button
            title="Create new account"
            onPress={() => this.props.navigation.navigate('sign-up')}
          />
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{marginTop: 10}}/>
          <Button
            type="outline"
            title="Log In"
            onPress={() => this.props.navigation.navigate('login')}
          />
        </View>
      </ScrollView>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  svg: {
    width: 250,
    height: 200,
    marginVertical: 30,
  },
  h1: {
    color: '#4388d6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  p: {
    color: '#0e1e40',
    textAlign: 'center',
    marginBottom: 20,
  }
});