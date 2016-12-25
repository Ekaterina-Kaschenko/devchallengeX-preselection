/*
 *
 * PointEditPage actions
 *
 */

import {
  CHANGE_NAME,
  CHANGE_LAT,
  CHANGE_LON,
  LOAD_CURRENT_POINT,
  LOAD_CURRENT_POINT_SUCCESS,
  LOAD_CURRENT_POINT_ERROR,
  SAVE_CURRENT_POINT,
  SAVE_CURRENT_POINT_SUCCESS,
  SAVE_CURRENT_POINT_ERROR,
  CHANGE_TO,
  CHANGE_TYPE,
  CHANGE_MINUTES,
  CHANGE_SECONDS,
  CHANGE_ROUTES,
  SAVE_CURRENT_CONNECTION,
} from './constants';

export function changeNameAction(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

export function changeLatAction(lat) {
  return {
    type: CHANGE_LAT,
    lat,
  };
}

export function changeLonAction(lon) {
  return {
    type: CHANGE_LON,
    lon,
  };
}

export function loadCurrentPointAction(id) {
  return {
    type: LOAD_CURRENT_POINT,
    id,
  };
}

export function loadCurrentPointSuccessAction(point) {
  return {
    type: LOAD_CURRENT_POINT_SUCCESS,
    point,
  };
}

export function loadCurrentPointErrorAction(error) {
  return {
    type: LOAD_CURRENT_POINT_ERROR,
    error,
  };
}

export function saveCurrentPointAction() {
  return {
    type: SAVE_CURRENT_POINT,
  };
}
export function saveCurrentPointSuccessAction() {
  return {
    type: SAVE_CURRENT_POINT_SUCCESS,
  };
}
export function saveCurrentPointErrorAction() {
  return {
    type: SAVE_CURRENT_POINT_ERROR,
  };
}

export function changeToAction(to) {
  return {
    type: CHANGE_TO,
    to,
  };
}
export function changeTypeAction(newType) {
  return {
    type: CHANGE_TYPE,
    newType,
  };
}
export function changeMinutesAction(minutes) {
  return {
    type: CHANGE_MINUTES,
    minutes,
  };
}
export function changeSecondsAction(seconds) {
  return {
    type: CHANGE_SECONDS,
    seconds,
  };
}
export function changeRoutesAction(routes) {
  return {
    type: CHANGE_ROUTES,
    routes,
  };
}
export function saveCurrentConnectionAction() {
  return {
    type: SAVE_CURRENT_CONNECTION,
  };
}
