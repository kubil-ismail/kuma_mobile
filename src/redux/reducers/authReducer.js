/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  loggedIn: false,
  apikey: null,
  userId: null,
  email: null,
  role: null,
  isLoading: false,
  isError: false,
  errMsg: null,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN_PENDING': {
      return {
        ...state,
        ...{
          isLoading: true,
          isError: false,
          errMsg: '',
        },
      };
    }
    case 'LOGIN_REJECTED': {
      const { data } = action.payload.data;
      return {
        ...state,
        ...{
          isLoading: false,
          isError: true,
          errMsg: data.message,
         },
      };
    }
    case 'LOGIN_FULFILLED': {
      const { data, status, message } = action.payload.data;
      if (status) {
        return {
          ...state,
          ...{
            loggedIn: status,
            apikey: data.apiKey,
            userId: data.userId,
            role: data.role,
            isLoading: false,
            isError: false,
          },
        };
      } else {
        return {
          ...state,
          ...{
            loggedIn: status,
            isLoading: false,
            isError: true,
            errMsg: message,
          },
        };
      }
    }
    // Sign Up
    case 'SIGN_UP': {
      return {
        ...state,
        ...{ email: action.payload },
      };
    }
    // Login
    case 'LOGOUT': {
      return {
        ...state,
        ...{
          loggedIn: false,
          apikey: false,
          userId: false,
          role: false,
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
