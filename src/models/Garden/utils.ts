import * as THREE from 'three';
import Curve from './common/Curve';
const randInt = THREE.MathUtils.randInt;
export const getRandomAngle = () => {
  return THREE.MathUtils.degToRad(randInt(-15, 15));
}

export const getRandomOffset = (limit: number) => {
  return new THREE.Vector3(
    randInt(-limit, limit),
    0,
    randInt(-limit, limit)
  )
}

export const getCablePaths = (points: THREE.Vector3[]) => {
  const cablePaths: THREE.QuadraticBezierCurve3[] = [];

  const pointsLength = points.length - 1;

  for (let i = 0; i < pointsLength; i++) {
    if (i + 1 > pointsLength) {
      break;
    }
    const startPoint = points[i];
    const endPoint = points[i + 1];
    const curve = new Curve({startPoint, endPoint}).curve;
    cablePaths.push(curve);
  }
  return cablePaths;
};

export const getMiddlePoint = (a: THREE.Vector3, b: THREE.Vector3) => {
  return new THREE.Vector3(
    (a.x + b.x) / 2,
    (a.y + b.y) / 2,
    (a.z + b.z) / 2,
  );
};
