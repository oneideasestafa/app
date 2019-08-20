import { 
  TOGGLE_NAVIGATION_MENU,
  SET_CURRENT_PAGE
} from '../../actions/navigation/types';

const initialState = {
  isMenuOpen: false,
  current: 'show',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
}