/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';


// Imports: Redux Actions
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import svg from '../../assets/image/undraw_reading_0re1.png';

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
      if (password === password2) {
        this.setState({ isLoading: true });
        try {
          this.props.reduxSignUp({
            email, password,
          });
          console.log(this.props.auth);
          // this.props.navigation.navigate('verify');
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
          errorMsg: 'Password not match',
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
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ textAlign: 'center', marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('login')}
          >
            Already have account
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
