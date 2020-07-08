/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_DETAIL_GENRE } from '../redux/actions/bookActions';

// import component
import BookCard from '../components/book';
import Error from '../components/error';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      options: [],
      genre: [],
      isLoading: true,
      onSearch: true,
      isError: false,
    };
    const { loggedIn, apikey, userId } = this.props.auth;
    if (!loggedIn && !apikey && !userId) {
      this.props.navigation.navigate('welcome');
    }
  }

  fetchBook = (page = 1) => {
    const { genreId } = this.props.route.params;
    axios.get(`${url}book/genre/${genreId}?limit=4&page=${page}`)
    .then((res) => {
      const { data } = res;
      this.props._SET_DETAIL_GENRE({
        data: data.data,
        options: data.options,
      });
      this.setState({ isLoading: false });
    })
    .catch(() => this.onError());
  };

  nextPage = () => {
    const { genre_book_options } = this.props.books;
    if (genre_book_options.next) {
      this.setState({ isLoading: true });
      const { genreId } = this.props.route.params;
      axios.get(`${url}book/genre/${genreId}?${genre_book_options.next}`)
      .then((res) => {
        const { data } = res;
        this.props._SET_DETAIL_GENRE({
          data: data.data,
          options: data.options,
        });
        this.setState({ isLoading: false });
      })
      .catch(() => this.onError());
    }
  }

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  }

  componentDidMount = () => {
    this.fetchBook();
  }

  render() {
    const { genre_book_data } = this.props.books;
    const { isError, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={isLoading} />
        {isError && (
          <Error />
        )}
        {!isError && !isLoading && genre_book_data.length === undefined && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!isError && !isLoading && genre_book_data.length >= 1 && (
          <>
            <FlatList
              data={genre_book_data}
              renderItem={({ item }) => (
                <BookCard
                  {...this.props}
                  id={item.id}
                  name={item.name}
                  cover={item.cover}
                  description={item.description}
                />
              )}
              keyExtractor={item => item.id.toString()}
              onRefresh={() => this.fetchBook()}
              refreshing={isLoading}
              onEndReached={this.nextPage}
              onEndReachedThreshold={0.5}
            />
          </>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    books: state.bookReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Books
    _SET_DETAIL_GENRE: (request) => dispatch(SET_DETAIL_GENRE(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Genre);
