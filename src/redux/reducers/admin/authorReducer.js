/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  isLoading: false,
  isError: false,
  author: [],
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH_AUTHOR
    case 'FETCH_AUTHOR_PENDING': {
      return {
        ...state,
        ...{
          isLoading: true,
          isError: false,
        },
      };
    }
    case 'FETCH_AUTHOR_REJECTED': {
      return {
        ...state,
        ...{
          isLoading: false,
          isError: true,
        },
      };
    }
    case 'FETCH_AUTHOR_FULFILLED': {
      const { data } = action.payload.data;
      return {
        ...state,
        ...{
          isLoading: false,
          isError: false,
          author: data,
        },
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
