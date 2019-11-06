import {
  FETCH_MARITAL_STATUS,
  ADD_COUNTRY_FOOTBALL_TEAMS,
  SET_TIMESTAMP_DIFF,
} from './types';
import axios from 'axios';
import { request } from './../../../config/axios';

export function fetchMaritalStatus () {
  return (dispatch, getState) => {
    const { auth: { accessToken }, app: { maritalStatus } } = getState();

    if (maritalStatus.length > 0)
      return Promise.resolve(maritalStatus);

    return request.get('/api/marital-status', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      const { data } = res;

      dispatch(refreshMaritalStatus(data));

      return data;
    });
  }
}

export function getTimestampDiff () {
  return dispatch => {
    const now = Date.now();

    return axios.get('/api/server/time').then(res => {
      const { time } = res.data;

      const diff = now - (time * 1000);
      
      dispatch(setTimestampDiff(diff));

      return diff;
    })
  }
}

export function fetchFootballTeams (countryId) {
  return (dispatch, getState) => {
    const { auth: { accessToken }, app: { teams } } = getState();

    if (teams[countryId])
      return Promise.resolve(teams[countryId]);

    return request.get(`api/country/${countryId}/teams`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      const { data } = res;

      dispatch(addCountryFootballTeams(countryId, data));

      return data;
    })
  };
}

export function refreshMaritalStatus (status) {
  return {
    type: FETCH_MARITAL_STATUS,
    payload: { status }
  }
}

export function addCountryFootballTeams (country, teams) {
  return {
    type: ADD_COUNTRY_FOOTBALL_TEAMS,
    payload: { country, teams }
  }
}

export function setTimestampDiff (diff) {
  return {
    type: SET_TIMESTAMP_DIFF,
    payload: { diff }
  };
}