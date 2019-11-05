import {
  FETCHED_EVENTS,
  SELECTED_CURRENT_EVENT,
  ADD_EVENT_TO_LIST,
} from './types';
import { 
  appStartedLoading,
  appFinishLoading
} from './../auth/index';
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

export function validateEventKey (key) {
  return (dispatch, getState) => {
    const { auth: { accessToken } } = getState();

    dispatch(appStartedLoading());

    return request.get(`api/event/${key}/validate`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      
      dispatch(addEventToList(res.data));
      dispatch(appFinishLoading());
      
      return res.data;
    }, err => {
      dispatch(appFinishLoading());

      return Promise.reject(err);
    })
  }
}

export function addEventToList (event) {
  return {
    type: ADD_EVENT_TO_LIST,
    payload: { event }
  };
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