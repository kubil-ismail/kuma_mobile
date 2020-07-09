/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_BOOK } from '../redux/actions/bookActions';
import { SET_GENRE } from '../redux/actions/genreActions';

// import component
import BookCard from '../components/book';
import GenreButton from '../components/genre';
import Header from '../components/header';
import Loader from '../components/loader';
import Error from '../components/error';

export class Book extends Component {
  fetchBook = async (page = 1) => {
    this.props._SET_BOOK({ page: page });
  };

  fetchGenre = () => {
    this.props._SET_GENRE();
  };

  componentDidMount = () => {
    this.fetchBook();
    this.fetchGenre();
  }

  render() {
    const { genre_data, genre_loading, genre_err } = this.props.genres;
    const { book_data, book_loading, book_err } = this.props.books;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={book_loading || genre_loading} />
        <Header />
        {/* Error Page */}
        {genre_err && book_err && (
          <Error />
        )}
        <ScrollView style={styles.body}>
          {/* Popular Books */}
          {!book_loading && !book_err && (
            <>
              <Text h3 style={styles.title}>Popular Book</Text>
              <FlatList
                horizontal
                data={book_data}
                renderItem={({ item }) => (
                  <BookCard
                    {...this.props}
                    id={item.id}
                    name={item.name}
                    cover={item.cover}
                    description={item.description}
                    horizontal={true}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
              />
            </>
          )}
          {/* All Genres */}
          {!genre_loading && !genre_err && (
            <>
              <View style={styles.divider}/>
              <Text h3 style={styles.title}>Genre Book</Text>
              <FlatList
                horizontal
                data={genre_data}
                renderItem={({ item }) => (
                  <GenreButton
                    {...this.props}
                    id={item.id}
                    name={item.name}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
              />
            </>
          )}
          <View style={styles.divider} />
          <View style={styles.divider} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    height: deviceHeight,
  },
  body: {
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#183153',
  },
  divider: {
    marginVertical: 10,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    books: state.bookReducer,
    genres: state.genreReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // SET_BOOK
    _SET_BOOK: (request) => dispatch(SET_BOOK(request)),
    // SET_GENRE
    _SET_GENRE: (request) => dispatch(SET_GENRE(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Book);
