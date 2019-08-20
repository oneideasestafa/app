import { 
  LOG_USER_IN,
  LOG_USER_OUT
} from '../../actions/auth/types';

const initialState = {
  isLoggedIn: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOG_USER_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
}