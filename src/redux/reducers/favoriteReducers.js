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
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET FAVORITE
    case 'FAVORITE': {
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
export default favoriteReducer;
