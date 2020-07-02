/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Form, Item, Input, Button, Text } from 'native-base';
import { KeyboardAvoidingView, StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native';
import logo from '../../assets/image/icon.png';

export default class SignUp extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
      >
        <ScrollView style={loginStyle.parent}>
          <View style={loginStyle.head}>
            <Image source={logo} style={loginStyle.logo} />
            <Text style={loginStyle.title}>Kuma Book</Text>
            <Text style={loginStyle.desc}>Sign Up to join Kuma Book comunity</Text>
          </View>
          <View style={loginStyle.body}>
            <Form>
              <Item regular style={loginStyle.input}>
                <Input placeholder="Email address" />
              </Item>
              <Item regular style={loginStyle.input}>
                <Input secureTextEntry placeholder="Password" />
              </Item>
              <Item regular style={loginStyle.input}>
                <Input secureTextEntry placeholder="Password Confirmation" />
              </Item>
              <Button info block style={loginStyle.button}>
                <Text>Sign Up</Text>
              </Button>
            </Form>
            <Text style={loginStyle.desc} onPress={() => this.props.navigation.navigate('login')}>Login existing account</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: 20,
  },
  logo: {
    width: 200,
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
    marginVertical: 20,
  },
});
