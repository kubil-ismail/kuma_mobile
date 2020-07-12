/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Text, Input, Image } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { FETCH_AUTHOR } from '../../redux/actions/admin/authorActions';

import axios from 'axios';

const url = 'http://192.168.1.4:8000/';

export class Admin_book extends Component {
  constructor(props) {
    super(props);
    const {
      author_id,
      cover,
      description,
      genre_id,
      id,
      language,
      name,
      published,
      status_id,
    } = props.route.params.book;
    this.state = {
      id: id,
      name: name,
      genre: genre_id.toString(),
      author: author_id.toString(),
      status: status_id.toString(),
      language: language,
      date: published,
      desc: description,
      fileName: '',
      fileType: '',
      fileUri: cover,
      isLoading: false,
    };
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: '../../assets/image/upload/',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Image must filled', ToastAndroid.SHORT);
      } else if (response.error) {
        ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT);
      } else if (response.customButton) {
        ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT);
      } else if (response.fileSize >= 2077116) {
        ToastAndroid.show('Max Size 2 Mb', ToastAndroid.SHORT);
      } else {
        this.setState({
          fileName: response.fileName,
          fileType: response.type,
          fileUri: response.uri,
        });
      }
    });
  }

  renderFileData() {
    if (this.state.fileUri && !this.state.fileType) {
      return <Image source={{ uri: `${url}${this.state.fileUri}` }}
        style={styles.images}
      />;
    } else {
      return <Image source={{ uri: this.state.fileUri }}
        style={styles.images}
      />;
    }
  }

  editBook = () => {
    const { apikey } = this.props.auth;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: apikey,
      },
    };
    const {
      id,
      name,
      desc,
      date,
      language,
      genre,
      author,
      status,
    } = this.state;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    formData.append('genre_id', parseInt(genre, 10));
    formData.append('author_id', parseInt(author, 10));
    formData.append('status_id', parseInt(status, 10));
    formData.append('published', date);
    formData.append('language', language);

    axios.patch(`${url}book/${id}`, formData, config)
      .then(() => ToastAndroid.show('Edit successfuly', ToastAndroid.SHORT))
      .catch((ERR) => console.log(ERR.response));
  }

  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text h3 style={styles.title}>Edit Book</Text>
          <View style={styles.head}>
            {this.renderFileData()}
            <Button
              title="Select cover book"
              onPress={() => this.launchImageLibrary()}
            />
          </View>
          <Input
            placeholder="Book name"
            defaultValue={this.state.name}
            onChangeText={(e) => this.setState({ name: e })}
          />
          <Input
            placeholder="Genre ID"
            defaultValue={this.state.genre}
            onChangeText={(e) => this.setState({ genre: e })}
          />
          <Input
            placeholder="Author ID"
            defaultValue={this.state.author}
            onChangeText={(e) => this.setState({ author: e })}
          />
          <Input
            placeholder="Status ID"
            defaultValue={this.state.status}
            onChangeText={(e) => this.setState({ status: e })}
          />
          <Input
            placeholder="Language"
            defaultValue={this.state.language}
            onChangeText={(e) => this.setState({ language: e })}
          />
          <Input
            placeholder="Date Published"
            defaultValue={this.state.date}
            onChangeText={(e) => this.setState({ date: e })}
          />
          <Input
            placeholder="Description"
            defaultValue={this.state.desc}
            onChangeText={(e) => this.setState({ desc: e })}
          />
          <Button
            title="Add Book"
            loading={isLoading}
            onPress={() => this.editBook()}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  head: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#183153',
  },
  images: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    author: state.adminAuthor,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // ADD_AUTHOR
    _ADD_AUTHOR: (data) => dispatch(FETCH_AUTHOR(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_book);
