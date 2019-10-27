import { combineReducers } from 'redux';
import events from './events';
import auth from './auth';
import navigation from './navigation';
import show from './show';
import download from './download';
import app from './app';

export default combineReducers({
  app,
  events,
  auth,
  navigation,
  show,
  download,
});
