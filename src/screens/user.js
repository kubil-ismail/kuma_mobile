/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_PROFILE } from '../redux/actions/profileActions';
import { logout } from '../redux/actions/authActions';

// Import component
import Header from '../components/header';
import Error from '../components/error';
import Loader from '../components/loader';

export class User extends Component {
  constructor(props) {
    super(props);
    const { loggedIn, apikey, userId } = this.props.auth;
    if (!loggedIn && !apikey && !userId) {
      this.props.navigation.navigate('welcome');
    }
  }

  fetchProfile = () => {
    const { apikey, userId } = this.props.auth;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    this.props._SET_PROFILE({
      userId, config,
    });
  }

  onLogout = () => {
    this.props._logout();
    this.props.navigation.navigate('welcome');
  }

  update = () => {
    this.props.navigation.navigate('Profile');
  }

  componentDidMount = () => {
    this.fetchProfile();
  }

  render() {
    const {
      name,
      email,
      facebook,
      instagram,
      twitter,
      profile_loading,
      profile_err,
    } = this.props.profile;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={profile_loading} />
        <Header />
        {profile_err && (
          <Error />
        )}
        {!profile_err && !profile_loading && (
          <ScrollView>
            <View style={styles.body}>
              <Avatar
                // rounded
                showEditButton={true}
                editButton={{color: 'red'}}
                title={name.slice(0,2)}
                size="xlarge"
                overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                activeOpacity={0.7}
              />
              <Text h2 style={{ marginTop: 10, color: '#183153' }}>{name}</Text>
            </View>

            <ListItem
              key={1}
              title={email}
              leftIcon={
                <View style={styles.icon}>
                  <Icon solid name="envelope" size={20} color="#6d6d6d" />
                </View>
              }
              bottomDivider
            />
            <ListItem
              key={2}
              title={facebook}
              leftIcon={
                <View style={styles.icon}>
                  <Icon solid name="facebook" size={20} color="#6d6d6d" />
                </View>
              }
              bottomDivider
            />
            <ListItem
              key={3}
              title={instagram}
              leftIcon={
                <View style={styles.icon}>
                  <Icon solid name="instagram" size={20} color="#6d6d6d" />
                </View>
              }
              bottomDivider
            />
            <ListItem
              key={4}
              title={twitter}
              leftIcon={
                <View style={styles.icon}>
                  <Icon solid name="twitter" size={20} color="#6d6d6d" />
                </View>
              }
              bottomDivider
            />
            <TouchableOpacity onPress={() => this.update()}>
              <ListItem
                key={7}
                title="Edit Profile"
                leftIcon={
                  <View style={styles.icon}>
                    <Icon solid name="edit" size={15} color="#6d6d6d" />
                  </View>
                }
                bottomDivider
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onLogout()}>
              <ListItem
                key={8}
                title="Log out"
                leftIcon={
                  <View style={styles.icon}>
                    <Icon solid name="sign-out-alt" size={20} color="#6d6d6d" />
                  </View>
                }
                bottomDivider
              />
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
  },
  body: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    alignItems: 'center',
    width: 20,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    profile: state.profileReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // UPDATE PROFILE
    _SET_PROFILE: (request) => dispatch(SET_PROFILE(request)),
    // Logout
    _logout: (trueFalse) => dispatch(logout(trueFalse)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(User);
