/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  data: [],
  options: [],
  isLoading: true,
  isError: false,
  errMsg: null,
};

// Reducers (Modifies The State And Returns A New State)
const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET GENRES
    case 'GENRE': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        data, options,
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
