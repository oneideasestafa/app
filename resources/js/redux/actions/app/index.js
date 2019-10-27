import {
  FETCH_MARITAL_STATUS,
  ADD_COUNTRY_FOOTBALL_TEAMS,
} from './types';
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