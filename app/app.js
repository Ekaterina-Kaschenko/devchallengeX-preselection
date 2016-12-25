import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
import '!file?name=[name].[ext]!./manifest.json';
/* eslint-enable import/no-unresolved */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import configureStore from './store';

import 'sanitize.css/sanitize.css';

const initialState = {};
const store = configureStore(initialState, browserHistory);

import { selectLocationState } from 'containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

import App from 'containers/App';
import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          applyRouterMiddleware(useScroll())
        }
      />
    </Provider>,
    document.getElementById('app')
  );
};

render();

import { install } from 'offline-plugin/runtime';
install();
