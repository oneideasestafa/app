import {
  FETCHED_EVENTS,
  SELECTED_CURRENT_EVENT,
} from './types';
import { request } from './../../../config/axios';

export function getEvents () {
  return (dispatch, getState) => {
    const { auth: { accessToken } } = getState();
    
    return request.get('api/events/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => dispatch(saveEvents(res.data.eventos)));
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