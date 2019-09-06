import {
  REMOVE_FILE,
  FETCHED_EVENTS,
  FETCHED_EVENT_FILES,
  SELECTED_CURRENT_EVENT,
  FILE_FINISHED_DOWNLOADING
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
      .map(file => new Promise((resolve, reject) => {
        requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
          let path = `${current.Empresa_id}/${current._id}/${file.name}`;

          fs.root.getFile(path, { create: false }, fe => {
            resolve({...file, exists: true });
          }, err => {
            console.log('getFile:', err);
            resolve({...file, exists: false });
          })
        })        
      }));

      return Promise.all(promises);
    })
    .then(files => dispatch(saveDownloads(files)));
  }
}

export function deleteFile (name) {
  return (dispatch, getState) => {
    const { events: { current } } = getState();
    const path = `${current.Empresa_id}/${current._id}/${name}`;
    console.log('name', name);
    console.log('path', path);

    const promise = new Promise((resolve, reject) => {
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
        fs.root.getFile(path, { create: false }, fe => {
          fe.remove(file => {
            resolve();
          }, err => reject(err))
        }, err => reject(err))
      }, err => reject(err))
    });

    return promise.then(() => {
      dispatch(removeFile(name));
    });
  }
}

export function removeFile (name) {
  return {
    type: REMOVE_FILE,
    payload: { name }
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

export function saveDownloads (files) {
  return {
    type: FETCHED_EVENT_FILES,
    payload: { files }
  };
}

export function fileFinishedDownloading (fileId) {
  return {
    type: FILE_FINISHED_DOWNLOADING,
    payload: { id: fileId }
  };
}