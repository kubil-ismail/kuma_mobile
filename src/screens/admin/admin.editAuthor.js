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
import { FETCH_AUTHOR } from '../../redux/actions/admin/authorActions';

// Import component
// import Loader from '../../components/loader';

import svg from '../../assets/image/undraw_like_dislike_1dfj.png';
import axios from 'axios';

const url = 'http://192.168.1.4:8000/';

export class Admin_author extends Component {
  constructor(props) {
    super(props);
    const { authorName } = this.props.route.params;
    this.state = {
      name: authorName,
      isLoading: false,
    };
  }

  editAuthor = () => {
    const { name } = this.state;
    const { apikey } = this.props.auth;
    const { authorId } = this.props.route.params;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    if (name) {
      this.setState({ isLoading: true });
      axios.patch(`${url}author/${authorId}`, {
        name,
      }, config)
      .then(() => ToastAndroid.show('Edit successfully', ToastAndroid.SHORT))
      .catch(() => ToastAndroid.show('Edit failed', ToastAndroid.SHORT));
      this.setState({ isLoading: false });
      this.props._FETCH_AUTHOR();
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
          <Text h3 style={styles.title}>Edit Author</Text>
          <Input
            placeholder="Author name"
            leftIcon={
              <Icon
                name="book-reader"
                size={24}
                color="black"
              />
            }
            defaultValue={this.state.name}
            onChangeText={(e) => this.setState({ name: e })}
          />
          <Button
            title="Edit Author"
            loading={isLoading}
            onPress={() => this.editAuthor()}
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
    // ADD_AUTHOR
    _FETCH_AUTHOR: (data) => dispatch(FETCH_AUTHOR(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_author);
