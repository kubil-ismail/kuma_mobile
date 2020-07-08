/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  genre_data: [],
  genre_option: [],
  genre_err: false,
  genre_msg: null,
};

// Reducers (Modifies The State And Returns A New State)
const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET GENRES
    case 'SET_GENRE': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
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
