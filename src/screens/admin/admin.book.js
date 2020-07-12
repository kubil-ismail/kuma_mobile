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
import { ListItem, Text, Button } from 'react-native-elements';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_BOOK } from '../../redux/actions/bookActions';

// Import component
import Header from '../../components/header';
import Loader from '../../components/loader';

import axios from 'axios';
const url = 'http://192.168.1.4:8000/';

export class Admin_book extends Component {
  fetchBook = async (page = 1) => {
    this.props._SET_BOOK({ page: page });
  };

  deleteBook = (id) => {
    const { apikey } = this.props.auth;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    axios.delete(`${url}book/${id}`, config)
      .then(() => {
        this.fetchBook();
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
            this.deleteBook(id);
          },
        },
      ],
    );
  }

  componentDidMount = () => {
    this.fetchBook();
  }

  render() {
    const { book_data, book_loading, book_err } = this.props.books;
    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={book_loading} />
        <Header />

        <View style={styles.head}>
          <Text h4 style={styles.title}>Book List</Text>
          <Button
            type="clear"
            title="Add New"
            onPress={() => this.props.navigation.navigate('add_book')}
          />
        </View>
        {!book_err && book_data.length >= 1 && (
          <View style={styles.body}>
            <FlatList
              data={book_data}
              renderItem={({ item }) => (
                <ListItem
                  key={item.id}
                  title={item.name}
                  leftIcon={{ name: 'book' }}
                  bottomDivider
                  chevron
                  onPress={() => this.props.navigation.navigate('Detail', {
                    bookId: item.id,
                    bookName: item.name,
                  })}
                  onLongPress={() => this.showAlert(item.id)}
                />
              )}
              keyExtractor={item => item.id.toString()}
              onRefresh={() => this.fetchBook()}
              refreshing={book_loading}
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
    books: state.bookReducer,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // SET_BOOK
    _SET_BOOK: (request) => dispatch(SET_BOOK(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_book);
