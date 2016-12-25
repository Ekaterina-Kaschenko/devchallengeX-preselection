import createPathFinder from '../utils/path-finder';
import { CHANGE_POINTS_WATCHER, PATH_CALCULATED } from 'containers/HomePage/constants';

let findPath = false;

self.onmessage = ({ data: action }) => {
  switch (action.type) {
    case CHANGE_POINTS_WATCHER:
      findPath = createPathFinder(action.payload.points);
      break;
    default:
      if (findPath) {
        const { start, goal } = action.payload;
        const path = findPath(start, goal);
        self.postMessage({
          type: PATH_CALCULATED,
          path,
        });
      }
  }
};

