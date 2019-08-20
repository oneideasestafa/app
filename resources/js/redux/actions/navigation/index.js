import {
  TOGGLE_NAVIGATION_MENU,
  SET_CURRENT_PAGE
} from './types';

export function toggleNavigationMenu () {
  return {
    type: TOGGLE_NAVIGATION_MENU
  }
}

export function setCurrentPage (page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  }
}