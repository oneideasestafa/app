import { 
  CHROMA_CAMERA,
  CHROMA_BACKGROUND,
  CHROMA_EFFECT,
} from '../../actions/chroma/types';

const initialState = {
  camera: '',
  background: '',
  effect: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHROMA_CAMERA:
      return {
        ...state,
        camera: action.payload.camera,
      };
      case CHROMA_BACKGROUND:
      return {
        ...state,
        background: action.payload.background,
      };
      case CHROMA_EFFECT:
      return {
        ...state,
        effect: action.payload.effect,
      };
    default:
      return state;
  }
}