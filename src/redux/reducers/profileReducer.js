/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  name: '-',
  email: '-',
  facebook: '-',
  instagram: '-',
  twitter: '-',
};

// Reducers (Modifies The State And Returns A New State)
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET_PROFILE
    case 'SET_PROFILE': {
      const { name, facebook, instagram, twitter } = action.payload;
      return {
        ...state,
        ...{ name, facebook, instagram, twitter },
      };
    }
    // SET_EMAIL
    case 'SET_EMAIL': {
      const { email } = action.payload;
      return {
        ...state,
        ...{ email },
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default profileReducer;
