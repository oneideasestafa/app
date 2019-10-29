import { 
  LOG_USER_IN,
  LOG_USER_OUT,
  REFRESH_USER_TOKENS,
  APP_START_LOADING,
  APP_FINISH_LOADING,
  REFRESH_USER_DATA
} from './types';
import { request } from './../../../config/axios';
import axios from 'axios';

export function authenticate (email, password) {
  return dispatch => {
    const auth = { accessToken: '', refreshToken: ''};
    let requestToken = null;

    if (process.env.NODE_ENV === 'development') {      
      requestToken = axios.post('/oauth/token', { 
        grant_type: 'password',
        client_id: process.env.MIX_APP_CLIENT_ID,
        client_secret: process.env.MIX_APP_CLIENT_SECRET,
        username: email,
        password
      });
      
    } else {
      requestToken = axios.post('/oauth/token', {
        username: email,
        password
      }, {
        baseURL: process.env.MIX_APP_AUTH_PROXY
      });
    }
    
    return requestToken.then(res => {
      const { access_token, refresh_token } = res.data;
      auth.accessToken = access_token;
      auth.refreshToken = refresh_token;

      return axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      })
    })
    .then(res => {
      const user = res.data;

      dispatch(login(user, auth.accessToken, auth.refreshToken));
    });
  }
}

export function socialAuthentication (provider, provAccessToken) {
  return dispatch => {
    const auth = { accessToken: '', refreshToken: ''};
    let requestToken = null;

    dispatch(appStartedLoading());

    if (process.env.NODE_ENV === 'development') {
      
      requestToken = axios.post('/oauth/token', {
        grant_type: 'social',
        client_id: process.env.MIX_APP_CLIENT_ID,
        client_secret: process.env.MIX_APP_CLIENT_SECRET,
        access_token: provAccessToken,
        provider
      });

    } else {

      requestToken = axios.post(`/oauth/${provider}/token`, {
        access_token: provAccessToken,
      }, {
        baseURL: process.env.MIX_APP_AUTH_PROXY
      });
    }

    return requestToken.then(res => {
      const { access_token, refresh_token } = res.data;
      auth.accessToken = access_token;
      auth.refreshToken = refresh_token;

      return request.get('/api/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      })
    })
    .then(res => {
      const user = res.data;

      dispatch(login(user, auth.accessToken, auth.refreshToken));
    })
    .then(() => dispatch(appFinishLoading()));
  }
}

export function fetchUser () {
  return (dispatch, getState) => {
    const { auth: { accessToken } } = getState();

    return request.get('/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      const { data } = res;

      dispatch(refreshUserData(data));

      return data;
    });
  }
}

export function login (user, accessToken, refreshToken) {
  return {
    type: LOG_USER_IN,
    payload: { user, accessToken, refreshToken }
  }
}

export function logout () {
  return {
    type: LOG_USER_OUT
  }
}

export function refreshUserData (user) {
  return {
    type: REFRESH_USER_DATA,
    payload: { user }
  }
}

export function refreshUserTokens (accessToken, refreshToken) {
  return {
    type: REFRESH_USER_TOKENS,
    payload: { accessToken, refreshToken },
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