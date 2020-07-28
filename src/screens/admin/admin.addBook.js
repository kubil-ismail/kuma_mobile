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
import { SET_BOOK } from '../../redux/actions/bookActions';

import axios from 'axios';

const url = 'http://192.168.1.4:8000/';

export class Admin_book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'null',
      genre: 1,
      author: 1,
      status: 1,
      language: 1,
      date: '20/20/2000',
      desc: 'oke',
      fileName: '',
      fileType: '',
      fileUri: '',
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
    if (this.state.fileUri) {
      return <Image source={{ uri: this.state.fileUri}}
        style={styles.images}
      />;
    } else {
      return <Image source={{ uri: 'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg'}}
        style={styles.images}
      />;
    }
  }

  addBook = () => {
    const { apikey } = this.props.auth;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: apikey,
      },
    };
    const {
      name,
      desc,
      fileName,
      fileType,
      fileUri,
      date,
      language,
      genre,
      author,
      status,
    } = this.state;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    formData.append('picture', {
      name: fileName,
      type: fileType,
      uri: fileUri,
    });
    formData.append('genreId', parseInt(genre, 10));
    formData.append('authorId', parseInt(author, 10));
    formData.append('statusId', parseInt(status, 10));
    formData.append('published', date);
    formData.append('language', language);

    axios.post(`${url}book`, formData, config)
    .then(() => {
      this.props._SET_BOOK({ page: 1 });
      ToastAndroid.show('Add successfuly', ToastAndroid.SHORT);
    })
    .catch(() => ToastAndroid.show('Something wrong, try again', ToastAndroid.SHORT));
  }

  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text h3 style={styles.title}>New Book</Text>
          <View style={styles.head}>
            {this.renderFileData()}
            <Button
              title="Select cover book"
              onPress={() => this.launchImageLibrary()}
            />
          </View>
          <Input
            placeholder="Book name"
            onChangeText={(e) => this.setState({ name: e })}
          />
          <Input
            placeholder="Genre ID"
            onChangeText={(e) => this.setState({ genre: e })}
          />
          <Input
            placeholder="Author ID"
            onChangeText={(e) => this.setState({ author: e })}
          />
          <Input
            placeholder="Status ID"
            onChangeText={(e) => this.setState({ status: e })}
          />
          <Input
            placeholder="Language"
            onChangeText={(e) => this.setState({ language: e })}
          />
          <Input
            placeholder="Date Published"
            onChangeText={(e) => this.setState({ date: e })}
          />
          <Input
            placeholder="Description"
            onChangeText={(e) => this.setState({ desc: e })}
          />
          <Button
            title="Add Book"
            loading={isLoading}
            onPress={() => this.addBook()}
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
    // SET_BOOK
    _SET_BOOK: (data) => dispatch(SET_BOOK(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Admin_book);
