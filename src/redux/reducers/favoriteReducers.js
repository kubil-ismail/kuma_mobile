/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  favorite_data: [],
  favorite_option: [],
  isError: false,
  errMsg: null,
};

// Reducers (Modifies The State And Returns A New State)
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET FAVORITE
    case 'SET_FAVORITE': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        favorite_data: data,
        favorite_option: options,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default favoriteReducer;
