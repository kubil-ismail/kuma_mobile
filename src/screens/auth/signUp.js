/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Image, Input } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import svg from '../../assets/image/undraw_reading_0re1.png';
import axios from 'axios';

const url = 'http://192.168.1.4:8000/';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      password2: null,
      isLoading: false,
      isError: false,
      errorMsg: null,
    };
  }

  signUp = async () => {
    const { email, password, password2 } = this.state;
    if (email !== null && password !== null) {
      if (password.length >= 8) {
        if (password === password2) {
          this.setState({ isLoading: true });
          axios.post(`${url}auth/signin`,{
            email, password,
          })
          .then((res) => {
            const { data } = res.data;
            this.setState({ isLoading: false });
            this.props.reduxSignUp(data.email);
            this.props.navigation.navigate('verify');
          })
          .catch((err) => {
            const { data } = err.response;
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            this.setState({
              isLoading: false,
              isError: true,
            });
          });
        } else {
          ToastAndroid.show('Password not match', ToastAndroid.SHORT);
          this.setState({
            isLoading: false,
            isError: true,
          });
        }
      } else {
        ToastAndroid.show('Password must be greater than 8 characters', ToastAndroid.SHORT);
        this.setState({
          isLoading: false,
          isError: true,
        });
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
          <Input
            placeholder="Password confirmation"
            onChangeText={(e) => this.setState({ password2: e })}
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
            title="Create new Account"
            loading={isLoading}
            onPress={() => this.signUp()}
            />

          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ marginTop: 20 }} />
          <Button
            title="Already have account"
            type="clear"
            onPress={() => this.props.navigation.navigate('login')}
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
    alignItems: 'center',
  },
  svg: {
    width: 250,
    height: 200,
    marginBottom: 30,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state,
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
