/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Button, SearchBar, Image, Text } from 'react-native-elements';
import {
  Alert,
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import axios from 'axios';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_SEARCH } from '../redux/actions/bookActions';

// import component
import BookCard from '../components/book';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _search: '',
      isLoading: false,
      onSearch: true,
      isError: false,
    };
  }

  updateSearch = (_search) => {
    this.setState({ _search });
  };

  search = () => {
    const { _search } = this.state;
    this.setState({ isLoading: true });
    axios.get(`${url}book?search=${_search}&limit=5`)
    .then((res) => {
      const { data } = res;
      this.props._SET_SEARCH({
        data: data.data,
        options: data.options,
      });
      this.onComplete();
    }).catch(() => this.onError());
  }

  nextPage = () => {
    const { search_option } = this.props.books;
    if (search_option.next) {
      this.setState({ isLoading: true });
      axios.get(`${url}book?${search_option.next}`)
      .then((res) => {
        const { data } = res;
        this.props._SET_SEARCH({
          data: data.data,
          options: data.options,
        });
        this.onComplete();
      })
      .catch(() => this.onError());
    }
  }

  descSort = () => {
    const { _search } = this.state;
    this.setState({ isLoading: true });
    axios.get(`${url}book?search=${_search}&limit=5&sort=1`)
    .then((res) => {
      const { data } = res;
      this.props._SET_SEARCH({
        data: data.data,
        options: data.options,
      });
      this.onComplete();
    }).catch(() => this.onError() );
  }

  onSort = (sort) => {
    if (parseInt(sort, 10) === 2) {
      // DESC
      this.descSort();
    } else {
      // ASC
      this.search();
    }
  };

  onComplete = () => {
    this.setState({
      isLoading: false,
      isError: false,
    });
  }

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  }

  showAlert = () => {
    Alert.alert(
      'Sort Book',
      'Select sort list type',
      [
        {
          text: 'Name A - Z', onPress: () => {
            this.onSort(1);
          },
        },
        {
          text: 'Name Z - A', onPress: () => {
            this.onSort(2);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  }

  render() {
    const { search_book } = this.props.books;
    const { _search, isError, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          lightTheme
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{backgroundColor: '#fff', paddingTop: 25}}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={_search}
          onSubmitEditing={this.search}
        />
        <Loader isLoading={isLoading} />
        {isError && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!isError && _search.length === 0 && search_book.length === 0 && (
          <View style={styles.center}>
            <Image
              source={require('../assets/image/undraw_typewriter_i8xd.png')}
              style={styles.svg}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )}
        {!isError && search_book.length >= 1 && (
          <>
            <View style={styles.head}>
              <Text h4 style={styles.title}>Search Result</Text>
              <Button
                type="clear"
                title="Sort"
                onPress={() => this.showAlert()}
              />
            </View>
            <View style={styles.body}>
              <FlatList
                data={search_book}
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
                onRefresh={() => this.search()}
                refreshing={isLoading}
                onEndReached={this.nextPage}
                onEndReachedThreshold={0.5}
              />
            </View>
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
  svg: {
    width: 250,
    height: 200,
    marginVertical: 30,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#183153',
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
    // SET_SEARCH
    _SET_SEARCH: (request) => dispatch(SET_SEARCH(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Search);
