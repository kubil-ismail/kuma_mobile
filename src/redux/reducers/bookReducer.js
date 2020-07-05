/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  loading: false,
};

// Reducers (Modifies The State And Returns A New State)
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      return {
        // State
        ...state,
        // Redux Store
        loading: action.trueFalse,
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
