/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { ButtonGroup, Button, Card, Image, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Imports: Redux Actions
import { connect } from 'react-redux';
import { SET_DETAIL, SET_REVIEW, ADD_REVIEW } from '../redux/actions/bookActions';
import { ADD_FAVORITE } from '../redux/actions/favoriteActions';

// Import component
import Error from '../components/error';
import Loader from '../components/loader';

const url = 'http://192.168.1.4:8000/';

export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputReview: null,
      addFavorite: true,
      addReview: true,
    };
  }

  fetchBook = () => {
    const { bookId } = this.props.route.params;
    this.props._SET_DETAIL({ bookId });
  };

  fetchReview = () => {
    const { bookId } = this.props.route.params;
    this.props._SET_REVIEW({ bookId });
  };

  addFavorite = () => {
    const { apikey, userId } = this.props.auth;
    const { bookId } = this.props.route.params;
    const config = {
      headers: {
        Authorization: apikey,
      },
    };
    const body = {
      book_id: bookId, user_id: userId,
    };
    this.props._ADD_FAVORITE({ body, config });
    const { addFavorite } = this.state;
    const { add_loading, add_err } = this.props.favorite;
    if (addFavorite && add_loading === false && add_err === false) {
      ToastAndroid.show('Book add to favorite list', ToastAndroid.SHORT);
      this.setState({ addFavorite: false });
    } else {
      ToastAndroid.show('Something wrong. Try again', ToastAndroid.SHORT);
    }
  }

  addReview = () => {
    const { InputReview } = this.state;
    if (InputReview) {
      const { apikey, userId } = this.props.auth;
      const { bookId } = this.props.route.params;
      const config = {
        headers: {
          Authorization: apikey,
        },
      };
      const body = {
        book_id: bookId,
        user_id: userId,
        review: InputReview,
        rating: 10,
      };

      this.props._ADD_REVIEW({ body, config });
      const { addReview } = this.state;
      const { review_loading, review_err } = this.props.book;
      if (addReview && review_loading === false && review_err === false) {
        ToastAndroid.show('Review success', ToastAndroid.SHORT);
        this.setState({ InputReview: null, addFavorite: false });
        this.fetchReview();
      } else {
        ToastAndroid.show('Something wrong. Try again', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Reviews cannot be empty', ToastAndroid.SHORT);
    }
  }

  componentDidMount = () => {
    this.fetchBook();
    this.fetchReview();
  }

  render() {
    const book_detail = this.props.detail,
    book_review = this.props.review;

    return (
      <SafeAreaView style={styles.container}>
        <Loader isLoading={this.props.bookLoading} />
        {this.props.bookErr && (
          <Error />
        )}

        {!this.props.bookErr && !this.props.bookLoading && (
          <ScrollView>
            <Image
              source={{ uri: `${url}${book_detail.cover}` }}
              style={styles.bg}
              resizeMode={'cover'}
              PlaceholderContent={<ActivityIndicator />}
            />

            <View style={styles.body}>
              <Image
                source={{ uri: `${url}${book_detail.cover}` }}
                style={styles.cover}
                resizeMode="center"
                PlaceholderContent={<ActivityIndicator />}
              />
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <Text h3 style={{ textAlign: 'center' }}>{book_detail.name}</Text>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <Text style={{ marginVertical: 10 }}>{book_detail.author}</Text>
              <ButtonGroup
                // eslint-disable-next-line react-native/no-inline-styles
                buttonContainerStyle={{ backgroundColor: '#e5f9fd' }}
                buttons={[
                  book_detail.genre || '',
                  book_detail.status || '',
                  book_detail.language || '',
                ]}
              />
              {/* About This Book */}
              <Text h4 style={styles.desc}>About</Text>
              <Text style={styles.desc}>{book_detail.description}</Text>

            </View>
            {/* Review */}
            <Text h4 style={styles.desc}>Review</Text>
            {book_review.length >= 1 && book_review.map((val) => (
              <Card
                key={val.id}
                title={val.fullname}
                titleStyle={styles.review}
              >
                <Text style={styles.review}>
                  {val.review}
                </Text>
              </Card>
            ))}
            <View style={styles.bottom}>
              <Input
                value={this.state.InputReview}
                placeholder="Add review..."
                onChangeText={(e) => this.setState({ InputReview: e })}
              />
              <Button
                title="Add review"
                onPress={this.addReview}
              />
            </View>
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.btnfloat}
          onPress={() => this.addFavorite()}
        >
          <Icon name="heart" solid size={20} color="#f57da1" />
        </TouchableOpacity>
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
  bg: {
    width: '100%',
    height: 200,
    opacity: 0.5,
  },
  body: {
    marginTop: '-40%',
    alignItems: 'center',
    padding: 15,
  },
  cover: {
    height: 200,
    width: 300,
    maxWidth: 200,
    minWidth: 200,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 5,
  },
  full: {
    flex: 1,
    padding: 10,
  },
  desc: {
    marginTop: 10,
    color: '#636d7b',
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  },
  review: {
    textAlign: 'left',
    color: '#636d7b',
  },
  btnfloat: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    elevation: 3,
  },
  bottom: {
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    auth: state.authReducer,
    book: state.bookReducer,
    detail: state.bookReducer.book_detail,
    review: state.bookReducer.book_review,
    favorite: state.favoriteReducer,
    bookLoading: state.bookReducer.detail_loading,
    bookErr: state.bookReducer.detail_err,
    reviewLoading: state.bookReducer.review_loading,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Detail
    _SET_DETAIL: (request) => dispatch(SET_DETAIL(request)),
    // Revies
    _SET_REVIEW: (request) => dispatch(SET_REVIEW(request)),
    _ADD_REVIEW: (request) => dispatch(ADD_REVIEW(request)),
    // Favorite
    _ADD_FAVORITE: (request) => dispatch(ADD_FAVORITE(request)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
