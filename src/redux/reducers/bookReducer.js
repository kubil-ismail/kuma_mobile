/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  book_data: [],
  book_option: [],
  book_detail: [],
  book_review: [],
  search_book: [],
  search_option: [],
  genre_book_data: [],
  genre_book_options: [],
  book_loading: true,
  book_err: false,
  book_msg: null,
};

// Reducers (Modifies The State And Returns A New State)
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET BOOKS
    case 'SET_BOOK_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        book_loading: true,
      };
    }
    case 'SET_BOOK_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        book_loading: false,
        book_err: true,
        book_msg: "Can't get data from server",
      };
    }
    case 'SET_BOOK_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        book_loading: false,
        book_data: data,
        book_option: options,
      };
    }
    // SET DETAIL
    case 'SET_DETAIL': {
      const { data } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        book_detail: data,
      };
    }
    // DETAIL_GENRE
    case 'SET_DETAIL_GENRE': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        genre_book_data: data,
        genre_book_options: options,
      };
    }
    // SET REVIEWS
    case 'SET_REVIEW': {
      const { data } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        book_review: data,
      };
    }
    // SET SEARCH
    case 'SET_SEARCH': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        search_book: data, search_option: options,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default bookReducer;
