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
import { SET_GENRE } from '../../redux/actions/genreActions';

// Import component
import Header from '../../components/header';
import Loader from '../../components/loader';

import axios from 'axios';
const url = 'http://192.168.1.4:8000/';

export class Admin_author extends Component {
  componentDidMount = () =>  {
    this.props._SET_GENRE();
  }

  deleteGenre = (id) => {
    const { apikey } = this.props.auth;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    axios.delete(`${url}genre/${id}`, config)
      .then(() => {
        this.props._SET_GENRE();
      }).catch(() => ToastAndroid.show('Something wrong, try again !', ToastAndroid.SHORT));
  }

  showAlert = (id) => {
    Alert.alert(
      'Are you sure ?',
      'Remove from genre list',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            this.deleteGenre(id);
          },
        },
      ],
    );
  }

  render() {
    const { genre_data, genre_loading, genre_err } = this.props.genres;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={genre_loading} />
        <Header />

        <View style={styles.head}>
          <Text h4 style={styles.title}>Book Genre</Text>
          <Button
            type="clear"
            title="Add New"
            onPress={() => this.props.navigation.navigate('add_genre')}
          />
        </View>
        {!genre_err && genre_data.length >= 1 && (
          <View style={styles.body}>
            <FlatList
              data={genre_data}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  title={item.name}
                  leftIcon={{ name: 'book' }}
                  bottomDivider
                  chevron
                  onLongPress={() => this.showAlert(item.id)}
                  onPress={() => this.props.navigation.navigate('edit_genre', {
                    genreId: item.id,
                    genreName: item.name,
                  })}
                />
              )}
              keyExtractor={item => item.id.toString()}
              refreshing={genre_loading}
              onRefresh={() => this.props._SET_GENRE()}
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
    genres: state.genreReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // FETCH_AUTHOR
    _SET_GENRE: (data) => dispatch(SET_GENRE(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_author);
