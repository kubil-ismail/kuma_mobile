/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  name: '-',
  email: '-',
  facebook: '-',
  instagram: '-',
  twitter: '-',
  profile_loading: false,
  profile_err: false,
};

// Reducers (Modifies The State And Returns A New State)
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET_PROFILE
    case 'SET_PROFILE_PENDING': {
      return {
        ...state,
        ...{
          profile_loading: true,
         },
      };
    }
    case 'SET_PROFILE_REJECTED': {
      return {
        ...state,
        ...{
          profile_loading: false,
          profile_err: true,
         },
      };
    }
    case 'SET_PROFILE_FULFILLED': {
      const { data } = action.payload.data;
      return {
        ...state,
        ...{
          name: data[0].fullname,
          email: data[0].email,
          facebook: data[0].facebook,
          instagram: data[0].instagram,
          twitter: data[0].twitter,
          profile_loading: false,
          profile_err: false,
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
export default profileReducer;
