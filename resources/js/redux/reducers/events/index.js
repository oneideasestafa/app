import { 
  FETCHED_EVENTS,
  FETCHED_EVENT_FILES,
  SELECTED_CURRENT_EVENT
} from '../../actions/events/types';

const initialState = {
  events: [],
  current: {},
  downloads: [],
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
        downloads: action.payload.files.map(file => ({
          id: file._id,
          name: file.NombreCompleto,
          size: file.Size,
          magnetURI: file.MagnetURI,
          active: file.Activo,
        }))
      }
    default:
      return state;
  }
}