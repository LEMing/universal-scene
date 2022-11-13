import * as THREE from 'three';

export const getRandomPoint = (low: number, high: number) => {
  return new THREE.Vector3(
    THREE.MathUtils.randFloat(low, high),
    THREE.MathUtils.randFloat(low, high),
    THREE.MathUtils.randFloat(low, high),
  )
}

export const getRandomPointFromBox = (box: THREE.Box3) => {
  const minX = box.min.x;
  const minY = box.min.y;
  const minZ = box.min.z;

  const maxX = box.max.x;
  const maxY = box.max.y;
  const maxZ = box.max.z;

  return new THREE.Vector3(
    THREE.MathUtils.randFloat(minX, maxX),
    THREE.MathUtils.randFloat(minY, maxY),
    THREE.MathUtils.randFloat(minZ, maxZ),
  )
}
