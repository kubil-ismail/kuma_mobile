/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  loggedIn: false,
  isLoading: false,
  isError: false,
  errorMsg: null,
  email: null,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    // case 'LOGIN_PENDING': {
    //   return {
    //     ...state,
    //     ...{ isLoading: true },
    //   };
    // }
    // case 'LOGIN_FULFILLED': {
    //   const { data } = action.payload.data;
    //   return {
    //     ...state,
    //     ...{ isLoading: false, data },
    //   };
    // }
    // case 'LOGIN_REJECTED': {
    //   return { ...state, ...{ isLoading: true, isError: true } };
    // }
    // Sign Up
    case 'SIGNUP_PENDING': {
      console.log('pending...');
      return {
        ...state,
        ...{ isLoading: true },
      };
    }
    case 'SIGNUP_FULFILLED': {

      console.log('full...');
      const { data } = action.payload.data;
      return {
        ...state,
        ...{ isLoading: false, data },
      };
    }
    case 'SIGNUP_REJECTED': {
      console.log('err...');
      return { ...state, ...{ isLoading: false, isError: true } };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
