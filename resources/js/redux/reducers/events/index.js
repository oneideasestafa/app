import { 
  REMOVE_FILE,
  FETCHED_EVENTS,
  FETCHED_EVENT_FILES,
  SELECTED_CURRENT_EVENT,
  FILE_FINISHED_DOWNLOADING
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
    case FILE_FINISHED_DOWNLOADING:
      const file = state.files.downloading.find(file => file.id === action.payload.id);
    
      return {
        ...state,
        files: {
          existing: [
            file,
            ...state.files.existing
          ],
          downloading: [
            ...state.files.downloading.filter(file => file.id !== action.payload.id)
          ]
        }
      };
    case REMOVE_FILE:
      return {
        ...state,
        files: {
          existing: state.files.existing.filter(file => file.name !== action.payload.name),
          downloading: state.files.downloading
        }
      }
    default:
      return state;
  }
}