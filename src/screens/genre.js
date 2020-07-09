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

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_DETAIL_GENRE, SET_DETAIL_GENRE_NEXT } from '../redux/actions/bookActions';

// import component
import BookCard from '../components/book';
import Error from '../components/error';
import Loader from '../components/loader';

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
  }

  fetchBook = (page = 1) => {
    const { genreId } = this.props.route.params;
    this.props._SET_DETAIL_GENRE({
      genreId, page: page,
    });
  };

  nextPage = () => {
    const { genre_book_options } = this.props.books;
    if (genre_book_options.next) {
      const { genreId } = this.props.route.params;
      this.props._SET_DETAIL_GENRE_NEXT({
        genreId, options: genre_book_options.next,
      });
    }
  }

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  }

  componentDidMount = () => {
    this.fetchBook();
  }

  render() {
    const { genre_book_data, book_genre_loading, book_genre_err } = this.props.books;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={book_genre_loading} />
        {book_genre_err && (
          <Error />
        )}
        {!book_genre_err && !book_genre_loading && genre_book_data.length === undefined && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!book_genre_err && !book_genre_loading && genre_book_data.length >= 1 && (
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
              refreshing={book_genre_loading}
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
    // _SET_DETAIL_GENRE
    _SET_DETAIL_GENRE: (request) => dispatch(SET_DETAIL_GENRE(request)),
    // _SET_DETAIL_GENRE_NEXT
    _SET_DETAIL_GENRE_NEXT: (request) => dispatch(SET_DETAIL_GENRE_NEXT(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Genre);
