/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { Button, Text, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_GENRE } from '../../redux/actions/genreActions';

import svg from '../../assets/image/undraw_like_dislike_1dfj.png';
import axios from 'axios';

const url = 'http://192.168.1.4:8000/';

export class Admin_genre extends Component {
  constructor(props) {
    super(props);
    const { genreName } = this.props.route.params;
    this.state = {
      name: genreName,
      isLoading: false,
    };
  }

  addGenre = () => {
    const { name } = this.state;
    const { apikey } = this.props.auth;
    const { genreId } = this.props.route.params;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    if (name) {
      this.setState({ isLoading: true });
      axios.patch(`${url}genre/${genreId}`, { name }, config)
        .then(() => ToastAndroid.show('Edit successfully', ToastAndroid.SHORT))
        .catch(() => ToastAndroid.show('Edit failed', ToastAndroid.SHORT));
      this.setState({ isLoading: false });
      this.props._SET_GENRE();
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image
            source={svg}
            style={styles.svg}
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator />}
          />

          <Text h3 style={styles.title}>Edit Genre</Text>
          <Input
            placeholder="Genre name"
            leftIcon={
              <Icon
                name="swatchbook"
                size={24}
                color="black"
              />
            }
            defaultValue={this.state.name}
            onChangeText={(e) => this.setState({ name: e })}
          />
          <Button
            title="Edit genre"
            loading={isLoading}
            onPress={() => this.addGenre()}
          />
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
    paddingHorizontal: 20,
  },
  svg: {
    width: 250,
    height: 200,
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#183153',
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    author: state.adminAuthor,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // SET_GENRE
    _SET_GENRE: (data) => dispatch(SET_GENRE(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_genre);
