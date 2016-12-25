import {
  CHANGE_POINTS,
  START_POINT,
  END_POINT,
  MAP_POINT,
  CALCULATE_PATH,
  PATH_CALCULATED,
  PATH_ERROR,
  CHANGE_POINTS_WATCHER,
} from './constants';

export function changeStartPoint(id) {
  return {
    type: CHANGE_POINTS,
    id,
    point: START_POINT,
  };
}

export function changeEndPoint(id) {
  return {
    type: CHANGE_POINTS,
    id,
    point: END_POINT,
  };
}

export function changeMapPoint(position) {
  return {
    type: CHANGE_POINTS,
    position,
    point: MAP_POINT,
  };
}

export function pathCalculated(path) {
  return {
    type: PATH_CALCULATED,
    path,
  };
}

export function pathError(message) {
  return {
    type: PATH_ERROR,
    message,
  };
}

export function calculatePathAction(start, goal) {
  return {
    type: CALCULATE_PATH,
    meta: {
      WebWorker: true,
    },
    payload: {
      start,
      goal,
    },
  };
}

export function sendPointsToWatcherAction(points) {
  return {
    type: CHANGE_POINTS_WATCHER,
    meta: {
      WebWorker: true,
    },
    payload: {
      points,
    },
  };
}
