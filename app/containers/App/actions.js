import {
  LOAD_COORDINATES,
  LOAD_COORDINATES_SUCCESS,
  LOAD_COORDINATES_ERROR,
} from './constants';

export function loadCoordinates() {
  return {
    type: LOAD_COORDINATES,
  };
}

export function coordinatesLoaded(data) {
  return {
    type: LOAD_COORDINATES_SUCCESS,
    data,
  };
}

export function coordinatesLoadingError(error) {
  return {
    type: LOAD_COORDINATES_ERROR,
    error,
  };
}
