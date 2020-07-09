/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, View, ScrollView, StyleSheet} from 'react-native';
import { Button, Image, Text  } from 'react-native-elements';

import svg from '../../assets/image/undraw_book_lover_mkck.png';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';

export class Welcome extends Component {
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

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.center}>
            <Image
              source={svg}
              style={styles.svg}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
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
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ marginTop: 10 }} />
          <Button
            title="Activate account"
            type="clear"
            onPress={() => this.props.navigation.navigate('verify')}
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
  },
  center: {
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
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
