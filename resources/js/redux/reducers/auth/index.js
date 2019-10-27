import { 
  LOG_USER_IN,
  LOG_USER_OUT,
  REFRESH_USER_TOKENS,
  REFRESH_USER_DATA,
  APP_START_LOADING,
  APP_FINISH_LOADING
} from '../../actions/auth/types';

let auth = JSON.parse(localStorage.getItem('auth'));

const initialState = auth ? auth : {
  isLoggedIn: false,
  user: null,
  accessToken: '',
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
        user: {...action.payload.user, id: action.payload.user._id },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }; break;
    case LOG_USER_OUT:
      result = {
        ...state,
        isLoggedIn: false,
        user: null,
        accessToken: '',
        refreshToken: '',
      }; break;
    case REFRESH_USER_TOKENS:
      result = {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }; break;
    case REFRESH_USER_DATA: 
      result = {
        ...state,
        user: action.payload.user
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