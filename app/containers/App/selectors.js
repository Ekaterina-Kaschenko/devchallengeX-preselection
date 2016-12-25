import { createSelector } from 'reselect';

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectCoordinates = () => (state) => state.get('coordinates');
const selectPoints = () => createSelector(
  selectCoordinates(),
  (myState) => myState.get('points') && myState.get('points').toJS()
);

const selectOptions = () => createSelector(
  selectPoints(),
  (points) => points && Object.values(points).map(({ id, name }) => ({ value: id, label: name }))
);

const types = {
  tram: 'Трамвай',
  taxi: 'Маршрутное такси',
  bus: 'Автобус',
  trolleybus: 'Троллейбус',
  cableway: 'Канатная дорога',
  subway: 'Метро',
  crossing: 'Переход',
};
const typesOptions = Object.keys(types).map(key => ({ value: key, label: types[key] }));

const selectTypes = () => () => typesOptions;

export {
  selectLocationState,
  selectPoints,
  selectOptions,
  selectTypes,
  types,
};
