import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

const middleware = [thunkMiddleware, logger];
const initialState = {};

const store = createStore(
  reducers, 
  initialState,
  compose(
    applyMiddleware(...middleware)  
  )
);

export default store;