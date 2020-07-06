/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { Badge, Text } from 'react-native-elements';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';

// import component
import BookCard from '../components/book';
import Header from '../components/header';
import Error from '../components/error';

const url = 'http://192.168.1.4:8000/';

export class Book extends Component {
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
    axios.get(`${url}book?limit=10&page=${page}`)
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

  fetchGenre = () => {
    axios.get(`${url}genre`)
    .then((res) => {
      const { data } = res;
      this.setState({
        genre: data.data,
      });
    })
    .catch(() => this.setState({ isError: true }));
  };

  viewGenre = (id, name) => {
    this.props.navigation.navigate('Genre',{
      genreId: id,
      genreName: name,
    });
  }

  componentDidMount = () => {
    this.fetchBook();
    this.fetchGenre();
  }

  render() {
    const { isError, isLoading, data, genre } = this.state;
    return (
      <SafeAreaView style={styles.container}>
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
                data={data}
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
                data={genre}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.viewGenre(item.id, item.name)}
                  >
                    <Badge
                      value={item.name}
                      badgeStyle={{ padding: 15 }}
                      containerStyle={{ padding: 5 }}
                    />
                  </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(Book);
