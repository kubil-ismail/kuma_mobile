/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Navigator
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Welcome from '../screens/auth/welcome';
import Login from '../screens/auth/login';
import SignUp from '../screens/auth/signUp';
import Verify from '../screens/auth/verify';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';

import Home from '../screens/book';
import Favorite from '../screens/favorite';
import User from '../screens/user';
import UpdateSosmed from '../screens/updateSosmed';
import UpdateUser from '../screens/updateUser';
import Detail from '../screens/detail';
import Genre from '../screens/genre';
import Search from '../screens/search';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export class Route extends Component {
  render() {
    const { loggedIn, apikey, userId } = this.props.auth;
    console.log('welcome', this.props.auth);

    return (
      <Stack.Navigator>
        {!loggedIn && !apikey && !userId ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              component={Welcome}
              name={'welcome'}
            />
            <Stack.Screen
              options={{headerShown: false}}
              component={Verify}
              name={'verify'}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name={'login'}
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              component={SignUp}
              name={'sign-up'}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={Tab}
              name={'home'}
            />
            <Stack.Screen
              options={(req) => ({ title: req.route.params.bookName })}
              component={Detail}
              name={'Detail'}
            />
            <Stack.Screen
              options={(req) => ({ title: req.route.params.genreName })}
              component={Genre}
              name={'Genre'}
            />
            <Stack.Screen component={UpdateSosmed} name={'Social Media'} />
            <Stack.Screen component={UpdateUser} name={'Profile'} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

export class Tab extends Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          options={{
            title: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="book" color={color} size={size} />
            ),
          }}
          component={Home}
          name="home"
        />
        <BottomTab.Screen
          options={{
            title: 'Search',
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
          component={Search}
          name="search"
        />
        <BottomTab.Screen
          options={{
            title: 'Favorite',
            tabBarIcon: ({color, size}) => (
              <Icon name="heart" solid color={color} size={size} />
            ),
          }}
          component={Favorite}
          name="favorite"
        />
        <BottomTab.Screen
          options={{
            title: 'Profile',
            tabBarIcon: ({color, size}) => (
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
export default connect(mapStateToProps, mapDispatchToProps)(Route);
