import axios from 'axios';
import store from './../redux';
import { refreshUserTokens, logout } from './../redux/actions/auth';

export const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

request.interceptors.response.use(response => {
  return response;
}, error => {
  const { config, response } = error;
  let refresh = null;

  if (response.status === 401) {
    const { auth } = store.getState();

    if (!auth.refreshToken)
      return Promise.reject(error);

    if (process.env.NODE_ENV === 'development') {
      refresh = axios.post(`/oauth/token`, {
        grant_type: 'refresh_token',
        refresh_token: auth.refreshToken,
        client_id: process.env.MIX_APP_CLIENT_ID,
        client_secret: process.env.MIX_APP_CLIENT_SECRET,
        scope: ''
      })
    } else {
      refresh = axios.post(`${process.env.MIX_APP_PROXY_URL}/oauth/token`, {
        refresh_token: auth.refreshToken,
      });
    }

    return refresh.then(res => {
      const { access_token, refresh_token } = res.data;

      store.dispatch(refreshUserTokens(access_token, refresh_token));

      config.headers['Authorization'] = `Bearer ${access_token}`;

      return axios(config);
    })
    .catch(err => store.dispatch(logout()));
    
  } else {
    return Promise.reject(error);
  }
})