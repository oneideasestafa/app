import {
  SET_SHOW_RIGHT_NOW,
  SET_NEXT_SHOW,
  SET_LAST_SHOW,
  TURN_JOB_OFF
} from './../../actions/show/types';

const initialState = {
  flash: {
    current: null,
    queue: [],
  },
  colors: {
    current: null,
    queue: [],
  },
};

export default function (state = initialState, action) {
  let show = '';

  switch (action.type) {
    case SET_SHOW_RIGHT_NOW:
      show = getShowType(action.payload.job.type);
      return {
        ...state,
        [show]: {
          ...state[show],
          current: action.payload.job,
        }
      };
    case SET_NEXT_SHOW:
      show = getShowType(action.payload.job.type);
      return {
        ...state,
        [show]: {
          ...state[show],
          queue: [
            action.payload.job,
            ...state[show].queue
          ]
        }
      };
    case SET_LAST_SHOW:
      show = getShowType(action.payload.job.type);
      return {
        ...state,
        [show]: {
          ...state[show],
          queue: [
            action.payload.job,
            ...state[show].queue
          ]
        }
      };
    case TURN_JOB_OFF:
      show = getShowType(action.payload.job.type);
      const isCurrent = state[show].current.id === action.payload.job.id;
      const next = state[show].queue[0];
      
      return {
        ...state,
        [show]: {
          current: isCurrent ? next : state[show].current,
          queue: isCurrent ? (
            state[show].queue.filter((_, i) => i !== 0)
            ) : (
            state[show].queue.filter(j => j.id !== action.payload.job.id)
          ),
        }
      }
    default:
      return state;
  }
}

function getShowType (type) {
  switch (type) {
    case 'COL':
      return 'colors'  
    case 'FLH':
      return 'flash'  
  }
}