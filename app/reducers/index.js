import { combineReducers } from 'redux';
import user from './userReducer';
import companies from './companiesReducer';
import company from './companyReducer';
import error from './errorMessageReducer';

const rootReducer = combineReducers({
  companies,
  error,
  user,
  company,
});

export default rootReducer;
