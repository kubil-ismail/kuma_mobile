/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { FETCH_AUTHOR } from '../../redux/actions/admin/authorActions';

// Import component
import Header from '../../components/header';
import Loader from '../../components/loader';

import axios from 'axios';
const url = 'http://192.168.1.4:8000/';

export class Admin_author extends Component {
  componentDidMount = () => {
    this.props._FETCH_AUTHOR();
  }

  deleteAuthor = (id) => {
    const { apikey } = this.props.auth;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    axios.delete(`${url}author/${id}`, config)
    .then(() => {
      this.props._FETCH_AUTHOR();
    }).catch(() => ToastAndroid.show('Something wrong, try again !', ToastAndroid.SHORT));
  }

  showAlert = (id) => {
    Alert.alert(
      'Are you sure ?',
      'Remove from author list',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            this.deleteAuthor(id);
          },
        },
      ],
    );
  }

  render() {
    const { author, isLoading, isError } = this.props.author;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={isLoading} />
        <Header />

        <View style={styles.head}>
          <Text h4 style={styles.title}>Book Author</Text>
          <Button
            type="clear"
            title="Add New"
            onPress={() => this.props.navigation.navigate('add_author')}
          />
        </View>
        {!isError && author.length >= 1 && (
          <View style={styles.body}>
            <FlatList
              data={author}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  title={item.name}
                  leftIcon={{ name: 'book' }}
                  bottomDivider
                  chevron
                  onLongPress={() => this.showAlert(item.id)}
                  onPress={() => this.props.navigation.navigate('edit_author', {
                    authorId: item.id,
                    authorName: item.name,
                  })}
                />
              )}
              keyExtractor={item => item.id.toString()}
              refreshing={isLoading}
              onRefresh={() => this.props._FETCH_AUTHOR()}
              style={styles.full}
            />
          </View>
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
  full: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: 'left',
    marginVertical: 10,
    color: '#183153',
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  body: {
    flex: 7,
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
