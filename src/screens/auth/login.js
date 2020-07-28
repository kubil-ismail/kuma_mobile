/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import { Button, Image, Input  } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';

import svg from '../../assets/image/undraw_bookshelves_xekd.png';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  onLogin = () => {
    const { email, password } = this.state;
    if (email !== null && password !== null) {
      this.setState({ isLoading: true });
      const body = { email, password };
      this.props.reduxLogin({ body });
      const { isLoading, isError, errMsg } = this.props.auth;
      if (isLoading === false && isError === true) {
        ToastAndroid.show(errMsg, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Email & Password must filled', ToastAndroid.SHORT);
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  }

  render() {
    const { isLoading } = this.props.auth;
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
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ marginTop: 20 }} />
          <Button
            title="Create new account"
            type="clear"
            onPress={() => this.props.navigation.navigate('sign-up')}
          />
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
