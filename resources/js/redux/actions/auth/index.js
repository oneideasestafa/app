import { 
  LOG_USER_IN,
  LOG_USER_OUT
} from './types';

export function login (uid, apiToken) {
  return {
    type: LOG_USER_IN,
    payload: { uid, apiToken }
  }
}

export function logout () {
  return {
    type: LOG_USER_OUT
  }
}