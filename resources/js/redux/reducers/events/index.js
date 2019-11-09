import { 
  FETCHED_EVENTS,
  SELECTED_CURRENT_EVENT,
  ADD_EVENT_TO_LIST
} from '../../actions/events/types';

const initialState = {
  events: [],
  current: null,
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
    case ADD_EVENT_TO_LIST:
      const exists = state.events.some(event => event._id === action.payload.event._id);

      return {
        ...state,
        events: exists ? (
          state.events
        ) :(
          [
            ...state.events,
            action.payload.event
          ]
        )
      };
    default:
      return state;
  }
}