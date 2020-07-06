/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { Button, Image, Input  } from 'react-native-elements';
import axios from 'axios';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';

import svg from '../../assets/image/undraw_bookshelves_xekd.png';
const url = 'http://192.168.1.4:8000/';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoading: false,
      isError: false,
      errorMsg: null,
    };

    const { loggedIn, apikey, userId } = this.props.auth;
    if (loggedIn && apikey && userId) {
      this.props.navigation.navigate('home');
    }
  }

  onLogin = () => {
    const { email, password } = this.state;
    if (email !== null && password !== null) {
      axios.post(`${url}auth/login`, {
        email, password,
      }).then((res) => {
        const { data } = res.data;
        if (data.apiKey) {
          this.props.reduxLogin({
            status: true,
            apikey: data.apiKey,
            userId: data.userId,
          });
          this.props.navigation.navigate('home');
        } else {
          this.props.reduxLogin({
            status: false,
            apiKey: null,
            userId: null,
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isError: true,
          errorMsg: err.response.data.message,
        });
      });
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
            onPress={() => this.onLogin()}
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

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Login
    reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Login);
