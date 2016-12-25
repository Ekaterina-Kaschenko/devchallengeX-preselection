import { createSelector } from 'reselect';

const selectPointEditPageDomain = () => state => state.get('pointEditPage');

const selectPointEditPage = () => createSelector(
  selectPointEditPageDomain(),
  (substate) => substate.toJS()
);

const selectCurrentPoint = () => createSelector(
  selectPointEditPageDomain(),
  (substate) => substate.get('currentPoint')
);
const selectCurrentConnection = () => createSelector(
  selectPointEditPageDomain(),
  (substate) => substate.get('connection')
);

export default selectPointEditPage;
export {
  selectPointEditPageDomain,
  selectCurrentPoint,
  selectCurrentConnection,
};
