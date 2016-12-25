/**
 * Gets the repositories of the user from Github
 */
import { takeEvery } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';

import { LOAD_COORDINATES_SUCCESS } from '../App/constants';
import { selectPoints } from '../App/selectors';
import { CHANGE_POINTS, MAP_POINT, PATH_CALCULATED_WORKER } from './constants';
import { pathCalculated, pathError, changeStartPoint, changeEndPoint, calculatePathAction, sendPointsToWatcherAction } from './actions';
import { selectStartPoint, selectEndPoint } from './selectors';

import { getDistance } from '../../utils/geo';

export function* getPathCalculationWatcher() {
  yield takeEvery(PATH_CALCULATED_WORKER, function* loader({ path }) {
    if (path) {
      yield put(pathCalculated(path));
    } else {
      yield put(pathError('No route avaliable'));
    }
  });
}


/**
 * Github repos request/response handler
 */
export function* calculatePath() {
  const startPoint = yield select(selectStartPoint());
  const endPoint = yield select(selectEndPoint());

  if (startPoint && endPoint) {
    if (startPoint === endPoint) {
      yield put(pathError('Відправна точка і точка призначення є однією і тією ж'));
    } else {
      yield put(calculatePathAction(startPoint, endPoint));
    }
  }
}
export function* getNearestPoint(points, position) {
  const nearest = Object.values(points).reduce((acc, point) => {
    const distance = getDistance(point, position);

    if (distance < acc.distance) {
      return {
        point,
        distance,
      };
    }
    return acc;
  }, { point: false, distance: 1 / 0 });
  if (nearest.point) {
    const startPoint = yield select(selectStartPoint());
    if (!startPoint) {
      yield put(changeStartPoint(nearest.point.id));
    } else {
      yield put(changeEndPoint(nearest.point.id));
    }
  }
}

export function* getCalculatePathWatcher() {
  const points = yield select(selectPoints());
  yield put(sendPointsToWatcherAction(points));

  let changePointsAction = yield take(CHANGE_POINTS);
  while (changePointsAction) {
    if (changePointsAction.point === MAP_POINT) {
      yield call(getNearestPoint, points, changePointsAction.position);
    }
    yield call(calculatePath);
    changePointsAction = yield take(CHANGE_POINTS);
  }
}

export function* coordinatesData() {
  let watcher = yield fork(getCalculatePathWatcher);

  while (yield take(LOAD_COORDINATES_SUCCESS)) {
    yield cancel(watcher);
    watcher = yield fork(getCalculatePathWatcher);
  }
}

export default [coordinatesData, getPathCalculationWatcher];
