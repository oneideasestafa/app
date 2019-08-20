import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const middleware = [thunkMiddleware];
const initialState = {};

const store = createStore(
  reducers, 
  initialState,
  compose(
    applyMiddleware(...middleware)  
  )
);

export default store;