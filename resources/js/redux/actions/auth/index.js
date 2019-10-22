import { 
  LOG_USER_IN,
  LOG_USER_OUT
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