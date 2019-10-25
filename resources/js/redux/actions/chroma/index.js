import { 
  CHROMA_CAMERA,
  CHROMA_BACKGROUND,
  CHROMA_EFFECT,
} from './types';

export function chromaTypeCamera(camera) {
	return {
		type: CHROMA_CAMERA,
		payload: { camera }
	}
}

export function chromaBackground(background) {
	return {
		type: CHROMA_BACKGROUND,
		payload: { background }
	}
}

export function chromaEffect(effect) {
	return {
		type: CHROMA_EFFECT,
		payload: { effect }
	}
}