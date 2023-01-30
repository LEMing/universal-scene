import * as THREE from 'three';
import arc from 'arc';

export const getSize = (object: THREE.Object3D | THREE.Group) => {
  const box = new THREE.Box3().setFromObject(object);
  return box.getSize(new THREE.Vector3());
}

export const getRandomColor = () => {
  return Math.random() * 0xffffff;
}

const greatCircle = (radius: number, pointA: THREE.Vector3, pointB: THREE.Vector3) => {
  const sphericalA = cartesianToSpherical(pointA);
  const sphericalB = cartesianToSpherical(pointB);

  const points: THREE.Vector3[] = [];

  const lat1 = sphericalA.phi;
  const lng1 = sphericalA.theta;
  const lat2 = sphericalB.phi;
  const lng2 = sphericalB.theta;

  const d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat2 - lat1) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng2 - lng1) / 2), 2)));

  for (let i = 0; i <= 100; i++) {
    const f = i / 100;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    const lng = Math.atan2(y, x);
    points.push(sphericalToCartesian(radius, lat, lng));
  }

  return points;
}
const getArchLinePoints = (radius: number, pointA: THREE.Vector3, pointB: THREE.Vector3) => {
  const sphericalA = cartesianToSpherical(pointA);
  const sphericalB = cartesianToSpherical(pointB);
  const start = {
    x: THREE.MathUtils.radToDeg(sphericalA.theta),
    y: THREE.MathUtils.radToDeg(sphericalA.phi)
  };
  const end = {
    x: THREE.MathUtils.radToDeg(sphericalB.theta),
    y: THREE.MathUtils.radToDeg(sphericalB.phi)
  };
  const generator = new arc.GreatCircle(start, end);
  const line = generator.Arc(10);

  const linePoints = line.geometries[0].coords;

  const vectorPoints = linePoints.map(point => sphericalToCartesian(
    radius,
    THREE.MathUtils.degToRad(point[1]),
    THREE.MathUtils.degToRad(point[0])
  ));

  console.log({start, end, linePoints, vectorPoints});
  return vectorPoints;
}
function createTubeFromLine(line: THREE.Line, radius: number, segments: number) {
  const positions = line.geometry.attributes.position.array;
  console.log('positions from tube ',{positions})
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < positions.length; i += 3) {
    points.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
  }
  const path = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeBufferGeometry(path, segments, radius, 16, false);
  const tubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  return tube;
}
export function cartesianToSpherical(vector: THREE.Vector3) {
  const spherical = new THREE.Spherical();
  spherical.setFromVector3(vector);
  return spherical;
}
export function sphericalToCartesian(r: number, phi: number, theta: number) {
  const spherical = new THREE.Spherical();
  spherical.set(r, phi, theta);
  return new THREE.Vector3().setFromSpherical(spherical);
}

export function getRandomTubeOnSphere(r: number): {tube: THREE.Mesh, line: THREE.Line, a: THREE.Vector3, b: THREE.Vector3} {
  const point1 = getRandomPointOnSphere(r);
  const point2 = getRandomPointOnSphere(r);
  const points =  greatCircle(r, point1, point2);
  const line = getLineFromPoints(points);
  const tube = createTubeFromLine(line, 6, 100);
  return {tube, line, a: point1, b: point2};
}

const getLineFromPoints = (points: THREE.Vector3[]) => {
  const material = new THREE.LineBasicMaterial({color: 0x0000ff});
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const line = new THREE.Line( geometry, material );
  return line;
}

const getBezierLine = (pointA: THREE.Vector3, pointB: THREE.Vector3, radius: number) => {
  const midPoint = pointB.clone().lerp(pointA, 0.5);
  midPoint.normalize();
  midPoint.multiplyScalar(radius);
  const spline = new THREE.CatmullRomCurve3([pointA, midPoint, pointB]);

  const points = spline.getPoints( 50 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  return new THREE.Line( geometry, material );
}


export function getRandomPointOnSphere(r: number): THREE.Vector3 {
  let phi = Math.random() * 2 * Math.PI;
  let theta = Math.acos(2 * Math.random() - 1);
  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.sin(theta) * Math.sin(phi);
  const z = r * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}
