/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/book';
import Favorite from '../screens/favorite';
import User from '../screens/user';
import Search from '../screens/search';

const BottomTab = createBottomTabNavigator();

export default class Member extends Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" color={color} size={size} />
            ),
          }}
          component={Home}
          name="home"
        />
        <BottomTab.Screen
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
          component={Search}
          name="search"
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
          component={User}
          name="user"
        />
      </BottomTab.Navigator>
    );
  }
}
