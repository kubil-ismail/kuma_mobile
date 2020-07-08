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
import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_BOOK } from '../redux/actions/bookActions';
import { SET_GENRE } from '../redux/actions/genreActions';

// import component
import BookCard from '../components/book';
import GenreButton from '../components/genre';
import Header from '../components/header';
import Error from '../components/error';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
    };
    const { loggedIn, apikey, userId } = this.props.auth;
    if (!loggedIn && !apikey && !userId) {
      this.props.navigation.navigate('welcome');
    }
  }

  fetchBook = (page = 1) => {
    axios.get(`${url}book?limit=10&page=${page}`)
    .then((res) => {
      const { data } = res;
      this.props._SET_BOOK({
        data: data.data,
        options: data.options,
      });
      this.setState({ isLoading: false });
    })
    .catch(() => this.onError());
  };

  fetchGenre = () => {
    axios.get(`${url}genre`)
    .then((res) => {
      const { data } = res;
      this.props._SET_GENRE({
        data: data.data,
        options: data.options,
      });
      this.setState({ isLoading: false });
    })
    .catch(() => this.onError() );
  };

  onError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    });
  }

  componentDidMount = () => {
    this.fetchBook();
    this.fetchGenre();
  }

  render() {
    const { isError, isLoading } = this.state;
    const { genre_data } = this.props.genres;
    const { book_data } = this.props.books;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={isLoading} />
        <Header />
        {isError && (
          <Error />
        )}
        {!isError && !isLoading && (
          <>
            <ScrollView style={styles.body}>
              {/* Popular Books */}
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
              {/* All Genres */}
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
              <View style={styles.divider} />
              <View style={styles.divider} />
            </ScrollView>
          </>
        )}
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
