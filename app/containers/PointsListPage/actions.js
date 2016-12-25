import {
  FILTER_POINTS,
} from './constants';

export function filterPointsAction(points) {
	return {
		type: FILTER_POINTS,
		points,
	};
}
