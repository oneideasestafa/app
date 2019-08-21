import { combineReducers } from 'redux';
import events from './events';
import auth from './auth';
import navigation from './navigation';

export default combineReducers({
  events,
  auth,
  navigation
});
