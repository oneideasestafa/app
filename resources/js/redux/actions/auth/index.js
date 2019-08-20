import { 
  LOG_USER_IN,
  LOG_USER_OUT
} from './types';

export function login () {
  return {
    type: LOG_USER_IN
  }
}

export function logout () {
  return {
    type: LOG_USER_OUT
  }
}