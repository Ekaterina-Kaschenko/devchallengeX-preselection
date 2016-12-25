import { fromJS } from 'immutable';
import {
  FILTER_POINTS,
} from './constants';

const initialState = fromJS({
	filteredPoints: false,
});

function pointsListPageReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_POINTS:
		return state.set('filteredPoints', action.points);
    default:
      return state;
  }
}

export default pointsListPageReducer;
