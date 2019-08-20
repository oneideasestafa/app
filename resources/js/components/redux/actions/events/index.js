import {
  FETCHED_EVENTS,
  SELECTED_CURRENT_EVENT
} from './types';
import axios from 'axios';

export function getEvents (apiToken) {
  return dispatch => {
    
    return axios.get('api/eventos', {
      headers: { Authorization: apiToken }
    })
    .then(res => dispatch(saveEvents(res.data.eventos)));
  }
}

export function saveEvents (events) {
  return {
    type: FETCHED_EVENTS,
    payload: events
  };
}