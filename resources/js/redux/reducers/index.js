import { combineReducers } from 'redux';
import events from './events';
import auth from './auth';
import navigation from './navigation';
import show from './show';
import download from './download';
import chroma from './chroma';

export default combineReducers({
  events,
  auth,
  chroma,
  navigation,
  show,
  download,
});
