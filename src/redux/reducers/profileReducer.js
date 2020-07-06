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
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // PATCH
    case 'PATCH': {
      const { name, facebook, instagram, twitter } = action.payload;
      return {
        ...state,
        ...{ name, facebook, instagram, twitter },
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
