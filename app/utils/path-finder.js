import _ from 'lodash';

const prepareNode = (points, id) => Object.assign({}, points[id], { closed: false, short: 1 / 0, costs: {} });

const getConnections = (current, fullList, points) => {
  return (current.connections || []).map(connection => {
    let point;
    if (fullList.has(connection.to)) {
      point = fullList.get(connection.to);
    } else {
      point = prepareNode(points, connection.to);
      fullList.set(connection.to, point);
    }
    point.costs[current.id] = connection.cost;
    return point;
  })
};


const getPath = (point, property = 'fromShort') => {
  const totalPath = [point];
  let current = point;
  while (property in current) {
    current = current[property];
    totalPath.push(current);
  }
  return _.map(totalPath.reverse(), p => _.pick(p, ['id', 'lat', 'lon', 'name']));
};

export default function createFinder(points) {
  return function findPath(start, goal) {
    const fullList = new Map();
    const openSet = [];
    const startNode = prepareNode(points, start);
    fullList.set(startNode.id, startNode);
    const endNode = prepareNode(points, goal);
    fullList.set(endNode.id, endNode);

    openSet.push(startNode);

    while (openSet.length > 0) {
      const current = openSet.shift();
      current.closed = true;
      for (const neighbor of getConnections(current, fullList, points)) {
        if (!neighbor.closed) {
          if (!_.find(openSet, neighbor)) {
            openSet.push(neighbor);
          }

          const scoreShort = (current.short === Number.POSITIVE_INFINITY ? 0 : current.short) + neighbor.costs[current.id];
          if (scoreShort < neighbor.short) {
            neighbor.fromShort = current;
            neighbor.short = scoreShort;
          }
        }
      }
    }

    let path = false;
    if ('fromShort' in endNode) {
      path = getPath(endNode);
    }

    return path;
  };
}
