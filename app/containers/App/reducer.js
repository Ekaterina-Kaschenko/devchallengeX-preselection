import { fromJS } from 'immutable';
import {
  LOAD_COORDINATES_SUCCESS,
} from './constants';
import _ from 'lodash/fp';

const initialState = fromJS({
  points: false,
  connections: false,
});

function coordinatesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COORDINATES_SUCCESS:
      return state
          .set('points', fromJS(action.data.points));
    default:
      return state;
  }
}

export default coordinatesReducer;
