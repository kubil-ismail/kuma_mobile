/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { SearchBar, Image, Text } from 'react-native-elements';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import axios from 'axios';

// import component
import BookCard from '../components/book';

const url = 'http://192.168.1.4:8000/';

export default class Search extends Component {
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

  updateSearch = (search) => {
    this.setState({ search });
  };

  search = () => {
    const { search } = this.state;
    axios.get(`${url}book?search=${search}&limit=10`)
    .then((res) => {
      const { data } = res;
      this.setState({
        data: data.data,
        options: data.options,
        isLoading: false,
        isError: false,
      });
    }).catch(() => this.setState({ isError: true }));
  }

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

  render() {
    const { data, search, isError, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          lightTheme
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{backgroundColor: '#fff', paddingTop: 25}}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          onSubmitEditing={this.search}
        />
        {isError && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!isError && search.length === 0 && (
          <View style={styles.center}>
            <Image
              source={require('../assets/image/undraw_typewriter_i8xd.png')}
              style={styles.svg}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )}
        {!isError && data.length >= 1 && (
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
            keyExtractor={item => item.id.toString()}
            onRefresh={() => this.search()}
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
});
