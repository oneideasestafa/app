import {
  FETCHED_EVENTS,
  FETCHED_EVENT_FILES,
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

export function getFilesFromEvent (eventId) {
  return dispatch => {
    
    return axios.get(`api/event/${eventId}/files`, {
      headers: { Authorization: localStorage.getItem('api_token') }
    })
    .then(res => dispatch(saveDownloads(res.data)))
  }
}

export function selectEvent (id) {
  return {
    type: SELECTED_CURRENT_EVENT,
    payload: { id }
  };
}

export function saveEvents (events) {
  return {
    type: FETCHED_EVENTS,
    payload: events
  };
}

export function saveDownloads (files) {
  return {
    type: FETCHED_EVENT_FILES,
    payload: { files }
  };
}