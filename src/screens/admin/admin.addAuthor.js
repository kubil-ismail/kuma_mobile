/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Button, Text, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { FETCH_AUTHOR } from '../../redux/actions/admin/authorActions';

// Import component
import Loader from '../../components/loader';

import svg from '../../assets/image/undraw_like_dislike_1dfj.png';

export class Admin_author extends Component {
  fetchAuthor = () => {
    this.props._FETCH_AUTHOR();
  };

  componentDidMount = () => {
    this.fetchAuthor();
  }

  render() {
    // const { author, isLoading, isError } = this.props.author;
    return (
      <SafeAreaView style={styles.container}>
        {/* <Loader isLoading={isLoading} /> */}
        <Image
          source={svg}
          style={styles.svg}
          resizeMode="contain"
          PlaceholderContent={<ActivityIndicator />}
        />

        <Text h3 style={styles.title}>New Author</Text>
        <Input
          placeholder="Author name"
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="black"
            />
          }
        />
        <Button
          title="Add New"
          // loading={isLoading}
          onPress={() => this.onLogin()}
        />
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
    // FETCH_AUTHOR
    _FETCH_AUTHOR: (data) => dispatch(FETCH_AUTHOR(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_author);
