/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  data: [],
  options: [],
  detail: [],
  reviews: [],
  detail_genre: [],
  isLoading: true,
  isError: false,
  errMsg: null,
};

// Reducers (Modifies The State And Returns A New State)
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET BOOKS
    case 'SET': {
      const { data, options } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        data, options,
      };
    }
    // SET BOOKS
    case 'DETAIL': {
      const { data } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        detail: data,
      };
    }
    // SET BOOKS
    case 'DETAIL_GENRE': {
      const { data } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        detail_genre: data,
      };
    }
    // SET REVIEWS
    case 'REVIEWS': {
      const { data } = action.payload;
      return {
        // State
        ...state,
        // Redux Store
        reviews: data,
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
