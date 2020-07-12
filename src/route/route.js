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

import admin_author from '../screens/admin/admin.addAuthor';
import Admin_genre from '../screens/admin/admin.addGenre';
import admin_book from '../screens/admin/admin.addBook';

import admin_author_edit from '../screens/admin/admin.editAuthor';
import Admin_genre_edit from '../screens/admin/admin.editGenre';
import admin_book_edit from '../screens/admin/admin.editBook';

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
            {/* ADD NEW */}
            <Stack.Screen
              component={admin_author}
              name={'add_author'}
              options={() => ({ title: 'New Author' })}
            />
            <Stack.Screen
              component={Admin_genre}
              name={'add_genre'}
              options={() => ({ title: 'New Genre' })}
            />
            <Stack.Screen
              component={admin_book}
              name={'add_book'}
              options={() => ({ title: 'New Book' })}
            />
            {/* EDIT */}
            <Stack.Screen
              component={admin_author_edit}
              name={'edit_author'}
              options={() => ({ title: 'Edit Author' })}
            />
            <Stack.Screen
              component={Admin_genre_edit}
              name={'edit_genre'}
              options={() => ({ title: 'Edit Genre' })}
            />
            <Stack.Screen
              component={admin_book_edit}
              name={'edit_book'}
              options={() => ({ title: 'Edit Book' })}
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
