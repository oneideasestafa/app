import { 
  LOG_USER_IN,
  LOG_USER_OUT,
  APP_START_LOADING,
  APP_FINISH_LOADING
} from './types';
import axios from 'axios';

export function authenticate (email, password) {
  return dispatch => {
    return axios.post('/api/usuarios/login', { email, password })
      .then(res => {
        const { user, access_token } = res.data;
        
        dispatch(login(user, access_token));

        return res;
      });
  }
}

export function socialAuthentication (apiToken) {
  return dispatch => {
    
    dispatch(appStartedLoading());

    return axios.get('/api/usuarios/social/oauth', {
      headers: {
        Authorization: apiToken,
      }
    })
    .then(res => {
      const { _id } = res.data;

      dispatch(login(_id, apiToken));
    })
    .then(() => dispatch(appFinishLoading()))
  }
}

export function login (uid, apiToken) {
  return {
    type: LOG_USER_IN,
    payload: { uid, apiToken }
  }
}

export function logout () {
  return {
    type: LOG_USER_OUT
  }
}

export function appStartedLoading () {
  return {
    type: APP_START_LOADING
  }
}

export function appFinishLoading () {
  return {
    type: APP_FINISH_LOADING
  }
}