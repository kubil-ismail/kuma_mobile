/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Welcome from '../screens/auth/welcome';
import Login from '../screens/auth/login';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <>
      <Stack.Screen
        options={{headerShown: false}}
        component={Welcome}
        name={'welcome'}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={Login}
        name={'login'}
      />
    </>
  );
}
