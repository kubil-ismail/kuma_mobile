/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native';
import logo from '../../../assets/image/undraw_reading_0re1.png';

export default class Login extends Component {
  render() {
    return (
      <ScrollView style={loginStyle.parent}>
        <View style={loginStyle.head}>
          <Image source={logo} style={loginStyle.logo} />
          <Text style={loginStyle.title}>Kuma Book</Text>
          <Text style={loginStyle.desc}>The world's largest novel and manga wikipedia and database 100% free</Text>
        </View>
        <View style={loginStyle.body}>
          <Button info block onPress={() => this.props.navigation.navigate('sign-up')}>
            <Text>Create account</Text>
          </Button>
          <Button
            block
            onPress={() => this.props.navigation.navigate('login')}
            style={loginStyle.button}
          >
            <Text>Log In</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const loginStyle = StyleSheet.create({
  parent: {
    height: deviceHeight,
  },
  head: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 10,
  },
  body: {
    padding: 30,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 10,
  },
  title: {
    color: '#68c2e8',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  desc: {
    color: '#0e1e40',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
  },
});
