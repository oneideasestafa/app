import {
  SET_SHOW_RIGHT_NOW,
  SET_NEXT_SHOW,
  SET_LAST_SHOW,
  TURN_JOB_OFF,
  EXECUTE_JOB,
  WIPE_JOBS,
  GET_LATEST_JOBS
} from './../../actions/show/types';

const initialState = {
  flash: {
    running: false,
    current: null,
    queue: [],
  },
  colors: {
    running: false,
    current: null,
    queue: [],
  },
  audio: {
    running: false,
    current: null,
    queue: [],
  },
};

export default function (state = initialState, action) {
  let show = '';
  let queue = [];
  let orderedQueue = [];

  switch (action.type) {
    case SET_SHOW_RIGHT_NOW:
      show = getShowType(action.payload.job.type);
      return {
        ...state,
        [show]: {
          ...state[show],
          current: action.payload.job,
          running: true,
        }
      };
    case SET_NEXT_SHOW:
      show = getShowType(action.payload.job.type);
      queue = [action.payload.job, ...state[show].queue];
      orderedQueue = queue.sort(sortQueue);

      return {
        ...state,
        [show]: {
          ...state[show],
          queue: orderedQueue
        }
      };
    case SET_LAST_SHOW:
      show = getShowType(action.payload.job.type);
      queue = [...state[show].queue, action.payload.job];
      orderedQueue = queue.sort(sortQueue);
      
      return {
        ...state,
        [show]: {
          ...state[show],
          queue: orderedQueue
        }
      };
    case TURN_JOB_OFF:
      show = getShowType(action.payload.job.type);
      const isCurrent = state[show].current.id === action.payload.job.id;
      const next = state[show].queue[0];
      
      return {
        ...state,
        [show]: {
          running: isCurrent ? false : true,
          current: isCurrent ? next : state[show].current,
          queue: isCurrent ? (
            state[show].queue.filter((_, i) => i !== 0)
            ) : (
            state[show].queue.filter(j => j.id !== action.payload.job.id)
          ),
        }
      }
    case EXECUTE_JOB:
      show = getShowType(action.payload.type);

      return {
        ...state,
        [show]: {
          ...state[show],
          running: true,
        }
      };
    case WIPE_JOBS:
      return {
        ...initialState
      };
    case GET_LATEST_JOBS: 
      let colors = action.payload.jobs
        .filter(job => job.Tipo === 'colores')
        .map(mapDatabaseToReducer)
        .sort(sortQueue);

      let flash = action.payload.jobs
        .filter(job => job.Tipo === 'flash')
        .map(mapDatabaseToReducer)
        .sort(sortQueue);

      let audios = action.payload.jobs
        .filter(job => job.Tipo === 'audio')
        .map(mapDatabaseToReducer)
        .sort(sortQueue);
    
      return {
        ...state,
        colors: {
          running: false,
          current: colors[0],
          queue: [...colors.slice(1)]
        },
        flash: {
          running: false,
          current: flash[0],
          queue: [...flash.slice(1)]
        },
        audio: {
          running: false,
          current: audios[0],
          queue: [...audios.slice(1)]
        }
      };
    default:
      return state;
  }
}

function getShowType (type) {
  switch (type) {
    case 'COL':
      return 'colors';  
    case 'FLH':
      return 'flash';
    case 'AUD':
      return 'audio';
  }
}

function sortQueue (a, b) {
  let startTimeA = parseInt(a.startTime);
  let startTimeB =parseInt(b.startTime);
  
  if (startTimeA < startTimeB)
    return -1;

  if (startTimeA === startTimeB)
    return 0;

  if (startTimeA > startTimeB)
    return 1;
}

function mapDatabaseToReducer (job) {
  let type = '';

  switch (job.Tipo) {
    case 'colores':
      type = 'COL';
      break;
    case 'flash':
      type = 'FLH';
      break;
    case 'audio':
      type = 'AUD';
      break;
    default:
      type = 'COL';
      break;
  }

  return {
    id: job._id,
    type: type,
    startTime: job.Inicio,
    endTime: job.Fin,
    payload: job.Parametro
  };
}