import { 
  SET_SHOW_RIGHT_NOW,
  SET_NEXT_SHOW,
  SET_LAST_SHOW,
  TURN_JOB_OFF,
  EXECUTE_JOB,
  WIPE_JOBS,
  GET_LATEST_JOBS
} from './types';
import { request } from './../../../config/axios';
import axios from 'axios';

export function fetchJobs (eventId, time) {
  return (dispatch, getState) => {
    
    const { accessToken } = getState().auth;

    return request.get(`api/event/${eventId}/jobs/${time.getTime()}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(res => dispatch(saveJobs(res.data.jobs)))
  }
}

export function findFileInPhoneStorage (fileName) {
  return (dispatch, getState) => {
    const { events: { current } } = getState();
    const path = `${current.Empresa_id}/${current._id}/${fileName}`;
    
    return new Promise((resolve, reject) => {
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
        fs.root.getFile(path, { create: false }, fe => {

          resolve({url: fe.toURL(), internalURL: fe.toInternalURL()});
        }, err => reject(err))
      }, err => reject(err));
    });
  }
}

export function saveJobs (jobs) {
  return {
    type: GET_LATEST_JOBS,
    payload: { jobs }
  }
}

export function executeJob (type) {
  return {
    type: EXECUTE_JOB,
    payload: { type }
  }
}

export function setShowRightNow (job) {
  return {
    type: SET_SHOW_RIGHT_NOW,
    payload: { job }
  }
}

export function setNextShow (job) {
  return {
    type: SET_NEXT_SHOW,
    payload: { job }
  }
}

export function setLastShow (job) {
  return {
    type: SET_LAST_SHOW,
    payload: { job }
  }
}

export function turnShowOff (job) {
  return {
    type: TURN_JOB_OFF,
    payload: { job }
  }
}

export function wipeJobs () {
  return {
    type: WIPE_JOBS
  }
}