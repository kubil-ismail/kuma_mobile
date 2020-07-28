/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/admin/admin.book';
import Author from '../screens/admin/admin.author';
import Genre from '../screens/admin/admin.genre';
import User from '../screens/user';

const BottomTab = createBottomTabNavigator();

export default class Admin extends Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          options={{
            title: 'Book',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" color={color} size={size} />
            ),
          }}
          component={Home}
          name="home"
        />
        <BottomTab.Screen
          options={{
            title: 'Author',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book-reader" color={color} size={size} />
            ),
          }}
          component={Author}
          name="author"
        />
        <BottomTab.Screen
          options={{
            title: 'Genre',
            tabBarIcon: ({ color, size }) => (
              <Icon name="swatchbook" solid color={color} size={size} />
            ),
          }}
          component={Genre}
          name="genre"
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
