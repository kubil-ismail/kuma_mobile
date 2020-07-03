/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from '../../../screens/home';
import Books from '../../../screens/books';
import Favorite from '../../../screens/favorite';
import Profile from '../../../screens/profile';

const BottomTab = createBottomTabNavigator();

export default class Tab extends Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
          component={Home}
          name="home"
        />
        <BottomTab.Screen
          options={{
            title: 'Books',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" color={color} size={size} />
            ),
          }}
          component={Books}
          name="book"
        />
        <BottomTab.Screen
          options={{
            title: 'Favorite',
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" solid color={color} size={size} />
            ),
          }}
          component={Favorite}
          name="favorite"
        />
        <BottomTab.Screen
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" solid color={color} size={size} />
            ),
          }}
          component={Profile}
          name="profile"
        />
      </BottomTab.Navigator>
    );
  }
}