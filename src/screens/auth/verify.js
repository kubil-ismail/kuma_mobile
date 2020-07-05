/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Button, Image } from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import axios from 'axios';
import store from 'store2';

import svg from '../../assets/image/undraw_confirmation_2uy0.png';
const url = 'http://192.168.1.4:8000/';

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'atta@gmail.com',
      code: null,
    };

    if (store('login')) {
      this.props.navigation.navigate('home');
    }
  }

  activate = async () => {
    const { email, code } = this.state;
    if (email !== null && code !== null) {
      this.setState({ isLoading: true });
      try {
        await axios.post(`${url}auth/activate`, {
          email: email, code: parseInt(code, 10),
        });

        this.props.navigation.navigate('login');
      } catch (error) {
        console.log(error.response.data);
        this.setState({
          isLoading: false,
          isError: true,
          errorMsg: error.response.data.message,
        });
      }
    }
  }

  render() {
    const { errorMsg, isLoading, code } = this.state;
    return (
      <SafeAreaView style={styles.container}>
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
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ textAlign: 'center', marginTop: 15 }}
          onPress={() => this.props.navigation.navigate('login')}
        >
          Already have account
        </Text>
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
    width: 250,
    height: 200,
    marginVertical: 30,
  },
});
