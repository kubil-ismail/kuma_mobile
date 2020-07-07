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

// import component
import BookCard from '../components/book';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      options: [],
      isLoading: false,
      onSearch: true,
      isError: false,
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  search = () => {
    const { search } = this.state;
    this.setState({ isLoading: true });
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
      this.setState({ isLoading: true });
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

  descSort = () => {
    const { search } = this.state;
    axios.get(`${url}book?search=${search}&limit=10&sort=1`)
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
        <Loader isLoading={isLoading} />
        {isError && (
          <View style={styles.center}>
            <Text>Book Not Found</Text>
          </View>
        )}
        {!isError && search.length === 0 && data.length === 0 && (
          <View style={styles.center}>
            <Image
              source={require('../assets/image/undraw_typewriter_i8xd.png')}
              style={styles.svg}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )}
        {!isError && data.length >= 1 && (
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
