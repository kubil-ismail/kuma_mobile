/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  loggedIn: false,
  apikey: null,
  userId: null,
  email: null,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      const { status, apikey, userId } = action.payload;
      return {
        ...state,
        ...{ loggedIn: status, apikey, userId },
      };
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
