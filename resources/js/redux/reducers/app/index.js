import { 
  FETCH_MARITAL_STATUS,
  ADD_COUNTRY_FOOTBALL_TEAMS,
  SET_TIMESTAMP_DIFF,
} from '../../actions/app/types';

const initialState = {
  maritalStatus: [],
  teams: {},
  timeOffset: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MARITAL_STATUS:
      return {
        ...state,
        maritalStatus: action.payload.status,
      };
    case ADD_COUNTRY_FOOTBALL_TEAMS: 
      return {
        ...state,
        teams: {
          ...state.teams,
          [action.payload.country]: action.payload.teams,
        }
      };
    case SET_TIMESTAMP_DIFF:
      return {
        ...state,
        timeOffset: action.payload.diff
      };
    default:
      return state;
  }
}