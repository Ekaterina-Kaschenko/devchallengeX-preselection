import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_COORDINATES } from './constants';
import { coordinatesLoaded, coordinatesLoadingError } from './actions';

import request from 'utils/request';

const requestURL = '/points.json';

export function* getCoordinates() {
  const points = yield call(request, requestURL);

  if (!points.err) {
    yield put(coordinatesLoaded(points.data));
  } else {
    yield put(coordinatesLoadingError(points.err));
  }
}

export function* getCoordinatesWatcher() {
  while (yield take(LOAD_COORDINATES)) {
    yield call(getCoordinates);
  }
}

export function* coordinatesData() {
  const watcher = yield fork(getCoordinatesWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default getCoordinatesWatcher;
