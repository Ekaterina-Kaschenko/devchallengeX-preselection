/** Converts numeric degrees to radians */
function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

export function getDistance(point1, point2) {
  const R = 6371e3; // metres
  const f1 = toRad(point1.lat);
  const f2 = toRad(point2.lat);
  const deltaF = toRad(point2.lat - point1.lat);
  const deltaL = toRad(point2.lon - point1.lon);

  const a = (Math.sin(deltaF / 2) * Math.sin(deltaF / 2)) +
    (Math.cos(f1) * Math.cos(f2) *
    Math.sin(deltaL / 2) * Math.sin(deltaL / 2));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
