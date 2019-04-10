import { combineReducers } from 'redux';
import table from './table';
import user from './user';

export default combineReducers({
  table,
  user,
});
