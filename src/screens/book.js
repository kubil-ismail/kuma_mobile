/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';

// import component
import BookCard from '../components/book';
import Header from '../components/header';
import Error from '../components/error';

const url = 'http://192.168.1.4:8000/';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      options: [],
      isLoading: true,
      onSearch: true,
      isError: false,
    };
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
    }).catch(() => this.setState({ isError: true }));
  };

  nextPage = () => {
    const { options } = this.state;
    if (options.next) {
      axios.get(`${url}book?${options.next}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          data: data.data,
          options: data.options,
          isLoading: false,
        });
      })
      .catch(() => this.setState({ isError: true }));
    }
  }

  componentDidMount = () => {
    this.fetchBook();
  }

  render() {
    const { isError, isLoading, data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        {isError && (
          <Error />
        )}
        {!isError && (
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
            keyExtractor={item => parseInt(item.id, 10)}
            onRefresh={() => this.fetchBook()}
            refreshing={isLoading}
            onEndReached={this.nextPage}
            onEndReachedThreshold={0.5}
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
});
