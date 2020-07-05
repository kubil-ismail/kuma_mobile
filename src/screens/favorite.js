/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

// Import component
import Header from '../components/header';
import Error from '../components/error';

const url = 'http://192.168.1.4:8000/';

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: [],
      userId: 30,
      isLoading: true,
      isError: false,
    };
  }

  fetchFavorite = () => {
    const { userId } = this.state;
    axios.get(`${url}profile/favorite/${userId}`,{
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfcmVzdWx0Ijp7ImlkIjo0LCJlbWFpbCI6Imt1bWFiZWFyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFdhL0NQNWc3cmh3c0RkUTBaQklRNGVoRWx2bDFUdDlQQU9hSlFBODVtSUtDdmVyODhMSlZXIiwicm9sZV9pZCI6MSwiYXBpX2tleSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIwLTA1LTEzVDAzOjAxOjQ2LjAwMFoiLCJ1cGRhdGVfYXQiOm51bGx9LCJpYXQiOjE1ODkzNDIyNTJ9.C6azxkpw5LRZqY65vzBWBomoPyn77344qI0hQiazYT4'
      },
    })
    .then((res) => {
      const { data } = res;
      this.setState({
        data: data.data,
        options: data.options,
        isLoading: false,
        isError: false,
      });
    })
    .catch(() => this.setState({isError: true}));
  };

  componentDidMount = () => {
    this.fetchFavorite();
  }

  render() {
    const { data, isLoading, isError } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header />

        {isError && (
          <Error/>
        )}

        {!isError && (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                title={item.name}
                subtitle={item.created_at.slice(0,10)}
                leftIcon={{ name: 'book' }}
                onPress={() => this.props.navigation.navigate('Detail',{
                  bookId: item.id,
                })}
                bottomDivider
                chevron
              />
            )}
            keyExtractor={item => parseInt(item.id, 10)}
            onRefresh={() => this.fetchFavorite()}
            refreshing={isLoading}
            style={styles.full}
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
  svg: {
    width: 250,
    height: 200,
    marginVertical: 30,
  },
  full: {
    flex: 1,
    padding: 10,
  },
});
