import { takeEvery } from 'redux-saga';
import { take, put, fork, select, call } from 'redux-saga/effects';
import { uniq } from 'lodash';

import { LOAD_COORDINATES_SUCCESS } from '../App/constants';
import { selectPoints } from '../App/selectors';
import request from 'utils/request';

import { LOAD_CURRENT_POINT, SAVE_CURRENT_POINT } from './constants';
import { loadCurrentPointSuccessAction, loadCurrentPointErrorAction, saveCurrentPointSuccessAction, saveCurrentPointErrorAction } from './actions';
import { selectCurrentPoint } from './selectors';

const saveUrl = '/api/addPoint';

export function* getEditedPoint(id) {
  if (id === 'new') {
    const preparedPoint = {
      id: false,
      name: '',
      lat: '',
      lon: '',
      connections: [],
    };
    yield put(loadCurrentPointSuccessAction(preparedPoint));
  } else {
    const points = yield select(selectPoints());
    const point = points[id];

    if (point) {
      const preparedPoint = Object.assign({}, point);
      preparedPoint.connections = preparedPoint.connections.map(c => {
        const { name } = points[c.to];
        return Object.assign({}, c, { name, routes: uniq(c.routes) });
      });
      yield put(loadCurrentPointSuccessAction(preparedPoint));
    } else {
      yield put(loadCurrentPointErrorAction('Точка не існує'));
    }
  }
}

export function* getEditWatcher() {
  yield takeEvery(LOAD_CURRENT_POINT, function* loader({ id }) {
    yield fork(getEditedPoint, id);
  });
}

export function* getSaveWatcher() {
  yield takeEvery(SAVE_CURRENT_POINT, function* saver() {
    const point = yield select(selectCurrentPoint());

    const resp = yield call(request, saveUrl, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(point.toJS()),
    });
    if (!resp.err) {
      yield put(saveCurrentPointSuccessAction());
    } else {
      yield put(saveCurrentPointErrorAction(resp.err));
    }
  });
}

export function* editPointData() {
  const action = yield take(LOAD_CURRENT_POINT);

  yield take(LOAD_COORDINATES_SUCCESS);
  yield fork(getEditWatcher);

  yield put(action);
}

export default [editPointData, getSaveWatcher];
