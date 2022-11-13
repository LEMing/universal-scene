import * as THREE from 'three';

export const getRandomPoint = (low: number, high: number) => {
  return new THREE.Vector3(
    THREE.MathUtils.randFloat(low, high),
    THREE.MathUtils.randFloat(low, high),
    THREE.MathUtils.randFloat(low, high),
  )
}
