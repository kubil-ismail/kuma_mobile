/* eslint-disable prettier/prettier */

// Initial State
const initialState = {
  favorite_data: [],
  favorite_option: [],
  favorite_loading: false,
  favorite_err: false,
  facorite_msg: null,
  add_loading: false,
  add_err: false,
};

// Reducers (Modifies The State And Returns A New State)
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET FAVORITE
    case 'SET_FAVORITE_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        favorite_loading: true,
      };
    }
    case 'SET_FAVORITE_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        favorite_loading: false,
        favorite_err: true,
      };
    }
    case 'SET_FAVORITE_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        favorite_loading: false,
        favorite_err: false,
        favorite_data: data,
        favorite_option: options,
      };
    }
    // SET FAVORITE NEXT
    case 'SET_FAVORITE_NEXT_FULFILLED': {
      const { data, options } = action.payload.data;
      return {
        // State
        ...state,
        // Redux Store
        favorite_loading: false,
        favorite_err: false,
        favorite_data: [...state.favorite_data, ...data],
        favorite_option: options,
      };
    }
    // ADD FAVORITE
    case 'ADD_FAVORITE_PENDING': {
      return {
        // State
        ...state,
        // Redux Store
        add_loading: true,
        add_err: false,
      };
    }
    case 'ADD_FAVORITE_REJECTED': {
      return {
        // State
        ...state,
        // Redux Store
        add_loading: false,
        add_err: true,
      };
    }
    case 'ADD_FAVORITE_FULFILLED': {
      return {
        // State
        ...state,
        // Redux Store
        add_loading: false,
        add_err: false,
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
