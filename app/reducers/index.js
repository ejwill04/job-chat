import { combineReducers } from 'redux';
// import user from './userReducer';
import companies from './companiesReducer';

const rootReducer = combineReducers({
  companies,
});

export default rootReducer;
