import { 
  LOG_USER_IN,
  LOG_USER_OUT
} from '../../actions/auth/types';

const initialState = {
  isLoggedIn: false,
  user: null,
  apiToken: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: { id: action.payload.uid },
        apiToken: action.payload.token
      };
    case LOG_USER_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        apiToken: '',
      };
    default:
      return state;
  }
}