import { createSelector } from 'reselect';

const selectPointsListPageDomain = () => state => state.get('pointsListPage');

const selectPointsListPage = () => createSelector(
  selectPointsListPageDomain(),
  (substate) => substate.toJS()
);

const selectFilteredPoints = () => createSelector(
  selectPointsListPageDomain(),
  (substate) => substate.get('filteredPoints'),
);

export default selectPointsListPage;
export {
  selectPointsListPageDomain,
  selectFilteredPoints,
};
