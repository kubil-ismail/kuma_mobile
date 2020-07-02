/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/login';
import SignUp from './screens/signup';
import Detail from './screens/detail';
import Tab from './components/organisms/footer';

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
                options={{ title: 'Kuma Book' }}
                component={Tab}
                name={'home'}
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
