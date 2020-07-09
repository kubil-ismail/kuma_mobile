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
  book_loading: false,
  book_err: false,
  book_msg: null,
  search_loading: false,
  search_err: false,
  search_msg: null,
  detail_loading: false,
  detail_err: false,
  review_loading: false,
  review_err: false,
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
        book_msg: "Can't get book from server",
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
    case 'SET_DETAIL_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        detail_loading: true,
      };
    }
    case 'SET_DETAIL_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        detail_loading: false,
        detail_err: true,
      };
    }
    case 'SET_DETAIL_FULFILLED': {
      const { data } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        book_detail: data[0],
        detail_loading: false,
        detail_err: false,
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
    case 'SET_REVIEW_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        review_loading: true,
      };
    }
    case 'SET_REVIEW_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        review_err: true,
        review_loading: false,
      };
    }
    case 'SET_REVIEW_FULFILLED': {
      const { data } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        book_review: data,
        review_err: false,
        review_loading: false,
      };
    }
    // SET SEARCH
    case 'SET_SEARCH_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        search_loading: true,
      };
    }
    case 'SET_SEARCH_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        search_loading: false,
        search_err: true,
        search_msg: 'Book not found',
      };
    }
    case 'SET_SEARCH_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        search_loading: false,
        search_err: false,
        search_book: data,
        search_option: options,
      };
    }
    // SET SEARCH NEXT
    case 'SET_SEARCH_NEXT_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        search_loading: false,
        search_err: false,
        search_book: [...state.search_book, ...data],
        search_option: options,
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
