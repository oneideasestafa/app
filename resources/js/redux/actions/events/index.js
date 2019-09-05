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
  return (dispatch, getState) => {
    const { events: { current }  } = getState();

    return axios.get(`api/event/${eventId}/files`, {
      headers: { Authorization: localStorage.getItem('api_token') }
    })
    .then(res => {
      const promises = res.data.map(file => ({
        id: file._id,
        name: file.NombreCompleto,
        size: file.Size,
        magnetURI: file.MagnetURI,
        active: file.Activo,
      }))
      .map(event => new Promise((resolve, reject) => {
        requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
          let path = `${current.Empresa_id}/${current._id}/${event.name}`;
          console.log('path', path);

          fs.root.getFile(path, { create: false }, fe => {
            resolve({...event, exists: true });
          }, err => {
            console.log('getFile:', err);
            resolve({...event, exists: false });
          })
        })        
      }));

      return Promise.all(promises);
    })
    .then(events => dispatch(saveDownloads(events)));
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