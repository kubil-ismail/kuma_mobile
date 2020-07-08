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
import { SET_FAVORITE } from '../redux/actions/favoriteActions';

// Import component
import Header from '../components/header';
import Error from '../components/error';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: [],
      userId: 30,
      isLoading: true,
      isError: false,
    };
    const { loggedIn, apikey, userId } = this.props.auth;
    if (!loggedIn && !apikey && !userId) {
      this.props.navigation.navigate('welcome');
    }
  }

  fetchFavorite = () => {
    const { apikey, userId } = this.props.auth;
    axios.get(`${url}profile/favorite/${userId}?limit=15`,{
      headers: {
        Authorization: apikey,
      },
    })
    .then((res) => {
      const { data } = res;
      this.props._SET_FAVORITE({
        data: data.data,
        options: data.options,
      });
      this.onComplete();
    })
    .catch(() => this.onError());
  };

  nextPage = () => {
    const { favorite_option } = this.props.favorites;
    if (favorite_option.next) {
      this.setState({ isLoading: true });
      const { apikey, userId } = this.props.auth;
      axios.get(`${url}profile/favorite/${userId}?${favorite_option.next}`,{
        headers: {
          Authorization: apikey,
        },
      })
      .then((res) => {
        const { data } = res;
        const { favorite_data } = this.props.favorites;
        this.props._SET_FAVORITE({
          data: [...favorite_data, ...data.data],
          options: data.options,
        });
        this.onComplete();
      })
      .catch((err) => console.log(err));
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

  onComplete = () => {
    this.setState({ isLoading: false, isError: false });
  }

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  }

  componentDidMount = () => {
    this.fetchFavorite();
  }

  render() {
    const { favorite_data } = this.props.favorites;
    const { isLoading, isError } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={isLoading} />
        <Header />
        {isError && (
          <Error/>
        )}

        {!isError && (
          <FlatList
            data={favorite_data}
            renderItem={({item}) => (
              // console.log('new', item.created_at.slice(0,10))
              <ListItem
                key={item.id}
                title={item.name}
                // subtitle={item.created_at.slice(0,10)}
                leftIcon={{ name: 'book' }}
                onPress={() => this.props.navigation.navigate('Detail',{
                  bookId: item.id,
                  bookName: item.name,
                })}
                onLongPress={() => this.showAlert(item.book_favorites_id)}
                bottomDivider
                chevron
              />
            )}
            keyExtractor={item => item.book_favorites_id.toString()}
            onRefresh={() => this.fetchFavorite()}
            refreshing={isLoading}
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
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

