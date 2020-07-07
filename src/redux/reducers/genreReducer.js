/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  genres: [],
  options: [],
  isLoading: true,
  isError: false,
  errMsg: null,
};

// Reducers (Modifies The State And Returns A New State)
const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET BOOKS
    case 'SET': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        genres: data, options,
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
