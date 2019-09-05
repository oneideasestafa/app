import { 
  FETCHED_EVENTS,
  FETCHED_EVENT_FILES,
  SELECTED_CURRENT_EVENT
} from '../../actions/events/types';

const initialState = {
  events: [],
  current: {},
  files: {
    existing: [],
    downloading: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHED_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case SELECTED_CURRENT_EVENT:
      return {
        ...state,
        current: state.events.find(event => event._id === action.payload.id)
      };
    case FETCHED_EVENT_FILES:
      return {
        ...state,
        files: {
          existing: action.payload.files.filter(file => file.exists === true),
          downloading: action.payload.files.filter(file => file.exists === false),
        },
      }
    default:
      return state;
  }
}