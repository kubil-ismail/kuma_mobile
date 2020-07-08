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

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_SEARCH, SET_SEARCH_NEXT } from '../redux/actions/bookActions';

// import component
import BookCard from '../components/book';
import Loader from '../components/loader';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _search: '',
    };
  }

  updateSearch = (_search) => {
    this.setState({ _search });
  };

  search = () => {
    const { _search } = this.state;
    this.props._SET_SEARCH({ search: _search });
  }

  nextPage = () => {
    const { search_option } = this.props.books;
    if (search_option.next) {
      this.props._SET_SEARCH_NEXT({
        search: search_option.next,
      });
    }
  }

  descSort = () => {
    const { _search } = this.state;
    this.props._SET_SEARCH({
      search: _search,
      options: '&sort=1',
    });
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
    const { search_book, search_loading, search_err } = this.props.books;
    const { _search } = this.state;
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
        <Loader isLoading={search_loading} />
        {search_err && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!search_err && _search.length === 0 && search_book.length === 0 && (
          <View style={styles.center}>
            <Image
              source={require('../assets/image/undraw_typewriter_i8xd.png')}
              style={styles.svg}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )}
        {!search_err && search_book.length >= 1 && (
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
                refreshing={search_loading}
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
    _SET_SEARCH_NEXT: (request) => dispatch(SET_SEARCH_NEXT(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Search);
