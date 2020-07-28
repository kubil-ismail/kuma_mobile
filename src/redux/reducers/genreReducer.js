/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  genre_data: [],
  genre_option: [],
  genre_loading: false,
  genre_err: false,
  genre_msg: null,
};

// Reducers (Modifies The State And Returns A New State)
const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET GENRES
    case 'SET_GENRE_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        genre_loading: true,
      };
    }
    case 'SET_GENRE_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        genre_loading: false,
        genre_err: true,
        genre_msg: "Can't get data from server",
      };
    }
    case 'SET_GENRE_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        genre_loading: false,
        genre_data: data,
        genre_option: options,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default genreReducer;
