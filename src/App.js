/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

// Auth Page
import Welcome from './screens/auth/welcome';
import Login from './screens/auth/login';
import SignUp from './screens/auth/signup';

import Detail from './screens/detail';
import Tab from './components/organisms/footer';

import logo from './assets/image/logo.png';
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  render() {
    const { isLogin } = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin && (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                component={Welcome}
                name={'welcome'}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                component={Login}
                name={'login'}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                component={SignUp}
                name={'sign-up'}
              />
            </>
          )}
          {isLogin && (
            <>
              <Stack.Screen
                options={{
                  headerTintColor: '#529ff3',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                component={Tab}
                name={'Kuma Book'}
              />
              <Stack.Screen
                options={{ title: 'Book Detail' }}
                component={Detail}
                name={'detail'}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
