/* eslint-disable prettier/prettier */
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import bookReducer from './bookReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  bookReducer,
});

// Exports
export default rootReducer;
