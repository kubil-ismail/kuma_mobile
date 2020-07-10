/* eslint-disable prettier/prettier */
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import favoriteReducer from './favoriteReducers';
import genreReducer from './genreReducer';
import profileReducer from './profileReducer';

// admin
import adminAuthor from './admin/authorReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  bookReducer,
  favoriteReducer,
  genreReducer,
  profileReducer,
  // Admin
  adminAuthor,
});

// Exports
export default rootReducer;
