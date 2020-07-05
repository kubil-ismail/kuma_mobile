/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Image, Input  } from 'react-native-elements';
import axios from 'axios';
import store from 'store2';

import svg from '../../assets/image/undraw_bookshelves_xekd.png';
const url = 'http://192.168.1.4:8000/';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoading: false,
      isError: false,
      errorMsg: null,
    };
  }

  login = async () => {
    const { email, password } = this.state;
    if (email !== null && password !== null) {
      this.setState({ isLoading: true });
      try {
        await axios.post(`${url}auth/login`,{
          email, password,
        });
        this.setState({
          isLoading: false,
          isError: false,
        });
        store({ login: true });
        this.props.login();
      } catch (error) {
        this.setState({
          isLoading: false,
          isError: true,
          errorMsg: error.response.data.message,
        });
      }
    } else {
      this.setState({
        isLoading: false,
        isError: true,
        errorMsg: 'Email & Password must filled',
      });
    }
  }

  render() {
    const { errorMsg, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image
            source={svg}
            style={styles.svg}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Input
            placeholder="Email address"
            keyboardType={'email-address'}
            onChangeText={(e) => this.setState({ email: e })}
            // eslint-disable-next-line react-native/no-inline-styles
            errorStyle={{ color: 'red' }}
            errorMessage={errorMsg}
            leftIcon={
              <Icon
                name="envelope"
                size={17}
                color="black"
              />
            }
          />
          <Input
            placeholder="Password"
            onChangeText={(e) => this.setState({ password: e })}
            secureTextEntry
            leftIcon={
              <Icon
                name="lock"
                size={24}
                color="black"
              />
            }
          />
          <Button
            title="Log In"
            loading={isLoading}
            onPress={() => this.login()}
          />
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{textAlign: 'center', marginTop: 10}}
            onPress={() => this.props.navigation.navigate('sign-up')}
          >
            Create new account
          </Text>
        </ScrollView>
      </SafeAreaView>
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
});
