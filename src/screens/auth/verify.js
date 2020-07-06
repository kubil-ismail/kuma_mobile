/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { Button, Image } from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import axios from 'axios';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/authActions';

import svg from '../../assets/image/undraw_confirmation_2uy0.png';

const url = 'http://192.168.1.4:8000/';

export class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
    };

    const { loggedIn, apikey, userId } = this.props.auth;
    if (loggedIn && apikey && userId) {
      this.props.navigation.navigate('home');
    }
  }

  activate = async () => {
    const { email } = this.props.auth;
    const { code } = this.state;
    if (email === null) {
      ToastAndroid.show('Sign Up first !', ToastAndroid.SHORT);
    } else if (code === null) {
      ToastAndroid.show('Pin must filled', ToastAndroid.SHORT);
    } else if (email !== null && code !== null) {
      this.setState({ isLoading: true });
      axios.post(`${url}auth/activate`, {
        email, code: parseInt(code, 10),
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('login');
      })
      .catch((err) => {
        const { data } = err.response;
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
    }
  }

  render() {
    const { errorMsg, isLoading, code } = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={svg}
              style={styles.svg}
              PlaceholderContent={<ActivityIndicator />}
            />
            <SmoothPinCodeInput
              value={code ? code : ''}
              onTextChange={(_code) => this.setState({ code: _code })}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={{color: 'red'}}>{errorMsg}</Text>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ marginTop: 20 }} />
            <Button
              title="Activate account"
              loading={isLoading}
              onPress={() => this.activate()}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ marginTop: 20 }} />
            <Button
              title="Create new account"
              type="clear"
              onPress={() => this.props.navigation.navigate('sign-up')}
            />
          </View>
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
    alignItems: 'center',
  },
  svg: {
    resizeMode: 'cover',
    width: 300,
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
    // Sign Up
    reduxSignUp: (request) => dispatch(signup(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
