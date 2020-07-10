/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';

// Navigator
import {createStackNavigator} from '@react-navigation/stack';
import Member from './member-route';
import Admin from './admin-route';

// Screens
import Welcome from '../screens/auth/welcome';
import Login from '../screens/auth/login';
import SignUp from '../screens/auth/signUp';
import Verify from '../screens/auth/verify';

import UpdateSosmed from '../screens/updateSosmed';
import UpdateUser from '../screens/updateUser';
import Detail from '../screens/detail';
import Genre from '../screens/genre';

import adminAuthor from '../screens/admin/admin.addAuthor';

const Stack = createStackNavigator();

export class Route extends Component {
  render() {
    const { loggedIn, apikey, userId, role } = this.props.auth;
    return (
      <Stack.Navigator>
        {/* Auth Page */}
        {!loggedIn && !apikey && !userId && !role && (
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
        )}

        {/* User page */}
        {loggedIn && apikey && userId && role === 1 && (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={Member}
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

        {/* Admin Page */}
        {loggedIn && apikey && userId && role === 2 && (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              component={Admin}
              name={'admin'}
            />
            <Stack.Screen
              component={adminAuthor}
              name={'add_author'}
              options={(req) => ({ title: 'New Author' })}
            />
            <Stack.Screen component={UpdateSosmed} name={'Social Media'} />
            <Stack.Screen component={UpdateUser} name={'Profile'} />
            <Stack.Screen
              options={(req) => ({ title: req.route.params.bookName })}
              component={Detail}
              name={'Detail'}
            />
          </>
        )}
      </Stack.Navigator>
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
