import {
  REMOVE_FILE,
  FETCHED_EVENT_FILES,
  SET_DOWNLOAD_PROGRESS,
  FILE_FINISHED_DOWNLOADING
} from './types';
import { request } from './../../../config/axios';

export function getFilesFromEvent (eventId) {
  return (dispatch, getState) => {
    const { events: { current }, auth: { accessToken }  } = getState();

    return request.get(`api/event/${eventId}/files`, {
      headers: { Authorization: `Bearer ${accessToken}` }
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

export function getFileObjectsFromStorage () {
  return (dispatch, getState) => {
    const { download: { existing }, events: { current }} = getState();

    const promises = existing.map(file => new Promise((resolve, reject) => {
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
        let path = `${current.Empresa_id}/${current._id}/${file.name}`;

        fs.root.getFile(path, { create: false }, fe => {
          fe.file(f => {
            return resolve(new Blob([f], { type: f.type }));
            let reader = new FileReader();

            reader.onloadend = function () {
              resolve(new Blob(this.result, f.type))
            }

            reader.readAsArrayBuffer(f);
          })
        }, err => resolve(null))
      })
    }));

    return Promise.all(promises);
  }
}

export function deleteFile (name) {
  return (dispatch, getState) => {
    const { events: { current } } = getState();
    const path = `${current.Empresa_id}/${current._id}/${name}`;

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

export function setDownloadProgress (progress, downloaded, downloadSpeed) {
  return {
    type: SET_DOWNLOAD_PROGRESS,
    payload: { progress, downloaded, downloadSpeed }
  };
}

export function fileFinishedDownloading (fileId) {
  return {
    type: FILE_FINISHED_DOWNLOADING,
    payload: { id: fileId }
  };
}

export function removeFile (name) {
  return {
    type: REMOVE_FILE,
    payload: { name }
  };
}

export function saveDownloads (files) {
  return {
    type: FETCHED_EVENT_FILES,
    payload: { files }
  };
}