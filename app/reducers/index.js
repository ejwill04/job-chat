import { combineReducers } from 'redux';
import user from './userReducer';
import companies from './companiesReducer';
import error from './errorMessageReducer';

const rootReducer = combineReducers({
  companies,
  error,
  user,
});

export default rootReducer;
