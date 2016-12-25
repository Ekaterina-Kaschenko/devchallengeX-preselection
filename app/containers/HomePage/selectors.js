import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');
const selectStartPoint = () => createSelector(
  selectHome(),
  (myState) => myState.get('startPoint')
);
const selectEndPoint = () => createSelector(
  selectHome(),
  (myState) => myState.get('endPoint')
);
const selectPath = () => createSelector(
  selectHome(),
  (myState) => myState.get('path')
);
const selectPathError = () => createSelector(
  selectHome(),
  (myState) => myState.get('pathError')
);


export {
  selectStartPoint,
  selectEndPoint,
  selectPath,
  selectPathError,
};
