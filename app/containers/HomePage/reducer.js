import { fromJS } from 'immutable';
import {
  CHANGE_POINTS,
  START_POINT,
  END_POINT,
  PATH_CALCULATED,
  PATH_ERROR,
} from './constants';

const initialState = fromJS({
  startPoint: '',
  endPoint: '',
  path: false,
  pathError: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_POINTS:
      switch (action.point) {
        case START_POINT:
          return state.set('startPoint', action.id)
                      .set('path', false);
        case END_POINT:
          return state.set('endPoint', action.id)
                      .set('path', false);
        default:
          return state;
      }
    case PATH_CALCULATED:
      if (action.path) {
        return state.set('path', action.path)
                    .set('pathError', '');
      }
      return state.set('pathError', 'Доступного маршруту не знайдено')
                .set('path', false);
    case PATH_ERROR:
      return state.set('pathError', action.message)
                  .set('path', false);
    default:
      return state;
  }
}

export default homeReducer;
