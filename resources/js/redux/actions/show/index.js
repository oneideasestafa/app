import { 
  SET_SHOW_RIGHT_NOW,
  SET_NEXT_SHOW,
  SET_LAST_SHOW,
  TURN_JOB_OFF,
  EXECUTE_JOB
} from './types';

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