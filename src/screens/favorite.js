/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_FAVORITE, SET_FAVORITE_NEXT } from '../redux/actions/favoriteActions';

// Import component
import Header from '../components/header';
import Error from '../components/error';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export class Favorite extends Component {
  constructor(props) {
    super(props);
    const { loggedIn, apikey, userId } = this.props.auth;
    if (!loggedIn && !apikey && !userId) {
      this.props.navigation.navigate('welcome');
    }
  }

  fetchFavorite = () => {
    const { apikey, userId } = this.props.auth;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    this.props._SET_FAVORITE({
      userId, config,
    });
  };

  nextPage = () => {
    const { favorite_option } = this.props.favorites;
    if (favorite_option.next) {
      const { apikey, userId } = this.props.auth;
      const config = {
        headers: {
          Authorization: apikey,
        },
      };
      this.props._SET_FAVORITE_NEXT({
        userId,
        config,
        options: favorite_option.next,
      });
    }
  }

  deleteFavorite = (id) => {
    const { apikey } = this.props.auth;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    axios.delete(`${url}favorite/${id}`, config)
    .then(() => {
      this.setState({ isLoading: true });
      this.fetchFavorite();
      ToastAndroid.show('Delete successfuly', ToastAndroid.SHORT);
    })
    .catch(() => {
      ToastAndroid.show('Something wrong. Try again !', ToastAndroid.SHORT);
    });
  }

  showAlert = (id) => {
    Alert.alert(
      'Are you sure ?',
      'Remove from favorite list',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            this.deleteFavorite(id);
          },
        },
      ],
    );
  }

  componentDidMount = () => {
    this.fetchFavorite();
  }

  render() {
    const { favorite_data, favorite_loading, favorite_err } = this.props.favorites;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={favorite_loading} />
        <Header />
        {favorite_data.length === 0 || favorite_err && (
          <Error msg="Favorite book not found"/>
        )}

        {!favorite_err && favorite_data.length >= 1 && (
          <FlatList
            data={favorite_data}
            renderItem={({item}) => (
              <ListItem
                key={item.id}
                title={item.name}
                subtitle={item.created_at.slice(0,10)}
                leftIcon={{ name: 'book' }}
                onPress={() => this.props.navigation.navigate('Detail',{
                  bookId: item.id,
                  bookName: item.name,
                })}
                bottomDivider
                onLongPress={() => this.showAlert(item.book_favorites_id)}
                chevron
              />
            )}
            keyExtractor={item => item.book_favorites_id.toString()}
            onRefresh={() => this.fetchFavorite()}
            refreshing={favorite_loading}
            onEndReached={this.nextPage}
            onEndReachedThreshold={0.5}
            style={styles.full}
          />
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
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    favorites: state.favoriteReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // SET_FAVORITE
    _SET_FAVORITE: (data) => dispatch(SET_FAVORITE(data)),
    // SET_FAVORITE NEXT
    _SET_FAVORITE_NEXT: (data) => dispatch(SET_FAVORITE_NEXT(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

