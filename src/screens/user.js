/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

// Import component
import Header from '../components/header';
import Error from '../components/error';

const url = 'http://192.168.1.4:8000/';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      userId: 30,
      profile: [],
    };
  }

  fetchProfile = () => {
    const { userId } = this.state;
    axios.get(`${url}profile/${userId}`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfcmVzdWx0Ijp7ImlkIjo0LCJlbWFpbCI6Imt1bWFiZWFyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFdhL0NQNWc3cmh3c0RkUTBaQklRNGVoRWx2bDFUdDlQQU9hSlFBODVtSUtDdmVyODhMSlZXIiwicm9sZV9pZCI6MSwiYXBpX2tleSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIwLTA1LTEzVDAzOjAxOjQ2LjAwMFoiLCJ1cGRhdGVfYXQiOm51bGx9LCJpYXQiOjE1ODkzNDIyNTJ9.C6azxkpw5LRZqY65vzBWBomoPyn77344qI0hQiazYT4'
      },
    })
    .then((res) => {
      const { data } = res;
      this.setState({
        profile: data.data[0],
        options: data.options,
        isLoading: false,
        isError: false,
      });
    })
    .catch(() => this.setState({ isError: true }));
  }

  componentDidMount = () => {
    this.fetchProfile();
  }

  render() {
    const { isError, isLoading, profile } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header />

        {isError && (
          <Error />
        )}
        {!isError && !isLoading && (
          <ScrollView>
            <View style={styles.body}>
              <Avatar
                // rounded
                title="BI"
                size="xlarge"
                overlayContainerStyle={{ backgroundColor: '#bcbec1' }}
                activeOpacity={0.7}
              />
              <Text h2 style={{ marginTop: 10, color: '#183153' }}>{profile.fullname}</Text>
            </View>

            <ListItem
              key={1}
              title={profile.email}
              leftIcon={
                <Icon solid  name="envelope" size={20} />
              }
              bottomDivider
            />
            <ListItem
              key={2}
              title={profile.facebook}
              leftIcon={
                <Icon solid name="facebook-f" size={20} />
              }
              bottomDivider
            />
            <ListItem
              key={3}
              title={profile.instagram}
              leftIcon={
                <Icon solid name="instagram" size={20} />
              }
              bottomDivider
            />
            <ListItem
              key={4}
              title={profile.twitter}
              leftIcon={
                <Icon solid name="twitter" size={20} />
              }
              bottomDivider
            />
            <ListItem
              key={5}
              title={profile.birthdate}
              leftIcon={
                <Icon solid name="birthday-cake" size={20} />
              }
              bottomDivider
            />
            <ListItem
              key={6}
              title={profile.gender}
              leftIcon={
                <Icon solid name="venus-mars" size={15} />
              }
              bottomDivider
            />
            <ListItem
              key={7}
              title="Log out"
              leftIcon={
                <Icon solid name="sign-out-alt" size={20} />
              }
              bottomDivider
            />
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
});
