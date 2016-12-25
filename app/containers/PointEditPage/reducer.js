/*
 *
 * PointEditPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_NAME,
  CHANGE_LAT,
  CHANGE_LON,
  LOAD_CURRENT_POINT_SUCCESS,
  LOAD_CURRENT_POINT_ERROR,
  CHANGE_TO,
  CHANGE_TYPE,
  CHANGE_MINUTES,
  CHANGE_SECONDS,
  CHANGE_ROUTES,
  SAVE_CURRENT_CONNECTION,
} from './constants';

const initialState = fromJS({
  currentPoint: false,
  loadError: '',
  connection: {
    to: '',
    name: '',
    type: 'bus',
    minutes: 0,
    seconds: 0,
    routes: '',
  },
});

function pointEditPageReducer(state = initialState, action) {
  let connection;
  switch (action.type) {
    case LOAD_CURRENT_POINT_ERROR:
      return state.set('loadError', action.error);
    case LOAD_CURRENT_POINT_SUCCESS:
      return state.set('currentPoint', fromJS(action.point));
    case CHANGE_NAME:
      return state.setIn(['currentPoint', 'name'], action.name);
    case CHANGE_LAT:
      return state.setIn(['currentPoint', 'lat'], action.lat);
    case CHANGE_LON:
      return state.setIn(['currentPoint', 'lon'], action.lon);
    case CHANGE_TO:
      return state.setIn(['connection', 'to'], action.to.value)
            .setIn(['connection', 'name'], action.to.label);
    case CHANGE_TYPE:
      return state.setIn(['connection', 'type'], action.newType);
    case CHANGE_MINUTES:
      return state.setIn(['connection', 'minutes'], action.minutes);
    case CHANGE_SECONDS:
      return state.setIn(['connection', 'seconds'], action.seconds);
    case CHANGE_ROUTES:
      return state.setIn(['connection', 'routes'], action.routes);
    case SAVE_CURRENT_CONNECTION:
      connection = state.get('connection').toJS();
      connection.cost = (connection.minutes * 60) + connection.seconds;
      connection.routes = connection.routes.split(',').filter(x => x);
	  connection.id = connection.to + '-' + connection.type;
      return state
		.setIn(['currentPoint', 'connections'], state.getIn(['currentPoint', 'connections']).concat([connection]))
		.set('connection', fromJS({
			to: '',
			name: '',
			type: 'bus',
			minutes: 0,
			seconds: 0,
			routes: '',
		}));
    default:
      return state;
  }
}

export default pointEditPageReducer;
