import { 
  REMOVE_FILE,
  FETCHED_EVENT_FILES,
  SET_DOWNLOAD_PROGRESS,
  FILE_FINISHED_DOWNLOADING
} from '../../actions/download/types';

const initialState = {
  current: null,
  progress: null,
  download: [],
  existing: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FILE_FINISHED_DOWNLOADING:
      const next = state.download.pop();
    
      return {
        ...state,
        current: next === undefined ? null : next,
        progress: null,
        existing: [
          state.current,
          ...state.existing
        ],
        download: [
          ...state.download,
        ],
      };
    case SET_DOWNLOAD_PROGRESS: 
      return {
        ...state,
        progress: {
          progress: action.payload.progress,
          downloaded: action.payload.downloaded,
          downloadSpeed: action.payload.downloadSpeed,
        }
      };
    case REMOVE_FILE:
      return {
        ...state,
        existing: state.existing.filter(file => file.name !== action.payload.name),
        download: state.download
      }
    case FETCHED_EVENT_FILES:
      const download = action.payload.files.filter(file => file.exists === false);
      const first = download.pop();

      return {
        ...state,
        download,
        current: first,
        existing: action.payload.files.filter(file => file.exists === true),
      }
    default:
      return state;
  }
}