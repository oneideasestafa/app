import { 
  LOG_USER_IN,
  LOG_USER_OUT,
  APP_START_LOADING,
  APP_FINISH_LOADING
} from '../../actions/auth/types';

const initialState = {
  isLoggedIn: false,
  user: null,
  apiToken: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: { id: action.payload.uid },
        apiToken: action.payload.apiToken
      };
    case LOG_USER_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        apiToken: '',
      };
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
      return state;
  }
}