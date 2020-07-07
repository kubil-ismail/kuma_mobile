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
import { login } from '../redux/actions/authActions';

// import component
import BookCard from '../components/book';
import Error from '../components/error';

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
    axios.get(`${url}book/genre/${genreId}?limit=10&page=${page}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          data: data.data,
          options: data.options,
          isLoading: false,
        });
      })
      .catch(() => this.setState({ isError: true }));
  };

  componentDidMount = () => {
    this.fetchBook();
  }

  render() {
    const { isError, isLoading, data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isError && (
          <Error />
        )}
        {!isError && !isLoading && data.length === undefined && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!isError && !isLoading && data.length >= 1 && (
          <>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <BookCard
                  {...this.props}
                  id={item.id}
                  name={item.name}
                  cover={item.cover}
                  description={item.description}
                />
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
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
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Login
    reduxLogin: (trueFalse) => dispatch(login(trueFalse)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Genre);
