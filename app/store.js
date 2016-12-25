/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createWorkerMiddleware from 'redux-worker-middleware';

import createReducer from './reducers';
import coordinatesData from 'containers/App/sagas';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

const PathFinderWorker = require('worker!./workers/PathFinderWorker');
const pathFinderWorker = new PathFinderWorker();

const workerMiddleware = createWorkerMiddleware(pathFinderWorker);

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    workerMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  sagaMiddleware.run(coordinatesData);
  store.runSaga = sagaMiddleware.run;

  if (module.hot) {
    System.import('./reducers').then((reducerModule) => {
      const createReducers = reducerModule.default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  store.asyncReducers = {};
  return store;
}
