/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { Avatar, Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { profile } from '../redux/actions/profileActions';

const url = 'http://192.168.1.4:8000/';

export class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      userId: 30,
      profile: [],
      facebook2: null,
      instagram2: null,
      twitter2: null,
    };
    const { loggedIn, apikey, userId } = this.props.auth;
    if (!loggedIn && !apikey && !userId) {
      this.props.navigation.navigate('welcome');
    }
  }

  onUpdate = () => {
    const { apikey, userId } = this.props.auth;
    const { name, email, facebook, instagram, twitter } = this.props.profile;
    const { facebook2, instagram2, twitter2 } = this.state;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    axios.patch(`${url}sosmed/${userId}`,{
      facebook: facebook2 || facebook,
      instagram: instagram2 || instagram,
      twitter: twitter2 || twitter,
    }, config)
    .then(() => {
      this.props.updateProfile({
        name: name,
        email: email,
        facebook: facebook2 || facebook,
        instagram: instagram2 || instagram,
        twitter: twitter2 || twitter,
      });
      ToastAndroid.show('Updated successfully', ToastAndroid.SHORT);
    })
    .catch(() => ToastAndroid.show('Something wrong try again', ToastAndroid.SHORT));
  }

  render() {
    const { name, facebook, instagram, twitter } = this.props.profile;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <Avatar
              // rounded
              showEditButton={true}
              editButton={{ color: 'red' }}
              title={name.slice(0, 2)}
              size="xlarge"
              overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
              activeOpacity={0.7}
            />
            <Text h2 style={{ marginTop: 10, color: '#183153' }}>{name}</Text>
          </View>
          <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
            <Input
              placeholder="Facebook"
              leftIcon={
                <Icon solid name="facebook" size={20} />
              }
              defaultValue={facebook}
              onChangeText={(e) => this.setState({ facebook2: e })}
            />
            <Input
              placeholder="Instagram"
              leftIcon={
                <Icon solid name="instagram" size={20} />
              }
              defaultValue={instagram}
              onChangeText={(e) => this.setState({ instagram2: e })}
            />
            <Input
              placeholder="Twitter"
              leftIcon={
                <Icon solid name="twitter" size={20} />
              }
              defaultValue={twitter}
              onChangeText={(e) => this.setState({ twitter2: e })}
            />
            <Button
              title="Update"
              onPress={this.onUpdate}
            />
          </View>
        </ScrollView>
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
    updateProfile: (request) => dispatch(profile(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Update);
