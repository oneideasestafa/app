import { 
  LOG_USER_IN,
  LOG_USER_OUT,
  APP_START_LOADING,
  APP_FINISH_LOADING
} from '../../actions/auth/types';

let auth = localStorage.getItem('auth');

const initialState = auth ? auth : {
  isLoggedIn: false,
  user: null,
  apiToken: '',
  refreshToken: '',
  loading: false,
};

export default function (state = initialState, action) {
  let result = state;

  switch (action.type) {
    case LOG_USER_IN:
      result = {
        ...state,
        isLoggedIn: true,
        user: {...action.payload.user, id: action.payload.user.id },
        apiToken: action.payload.apiToken,
        refreshtoken: action.payload.refreshtoken
      }; break;
    case LOG_USER_OUT:
      result = {
        ...state,
        isLoggedIn: false,
        user: null,
        apiToken: '',
      }; break;
    case APP_START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case APP_FINISH_LOADING: 
      return {
        ...state,
        loading: false,
      };
    default:
      result = state; break;
  }

  localStorage.setItem('auth', JSON.stringify(result));

  return result;
}