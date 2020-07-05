/* eslint-disable prettier/prettier */
// Imports: Dependencies
import React,{ Component } from 'react';
import {PersistGate} from 'redux-persist/integration/react'; // Imports: Redux Persist Persister
import {Provider} from 'react-redux'; // Imports: Screens
import {store, persistor} from './redux/store'; // React Native: App
import Icon from 'react-native-vector-icons/FontAwesome5';

// Navigator
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// Screens
import Welcome from './screens/auth/welcome';
import Login from './screens/auth/login';
import SignUp from './screens/auth/signUp';
import Verify from './screens/auth/verify';

import Home from './screens/book';
import Favorite from './screens/favorite';
import User from './screens/user';
import Detail from './screens/detail';
import Search from './screens/search';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
    };
  }

  login = () => {
    this.setState({ isLogin: true });
    this.props.naviagion.navigate('home');
  };
  logout = () => {
    this.setState({ isLogin: false });
    this.props.naviagion.navigate('login');
  };

  render() {
    const { login } = this.state;
    return (
      // Redux: Global Store
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              {login && (
                <>
                  <Stack.Screen
                    options={{
                      headerShown: false,
                    }}
                    component={Tab}
                    name={'home'}
                  />
                  <Stack.Screen
                    component={Detail}
                    name={'Detail'}
                  />
                </>
              )}

              {!login && (
                <>
                  <Stack.Screen
                    options={{ headerShown: false }}
                    component={Welcome}
                    name={'welcome'}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    component={Verify}
                    name={'verify'}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name={'login'}
                  >
                    {props => <Login {...props} login={this.login} />}
                  </Stack.Screen>
                  <Stack.Screen
                    options={{ headerShown: false }}
                    component={SignUp}
                    name={'sign-up'}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
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
            title: 'Favorite',
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
