import * as THREE from 'three';

export const getSize = (object: THREE.Object3D) => {
  const box = new THREE.Box3().setFromObject(object);
  return box.getSize(new THREE.Vector3());
}

export const getRandomColor = () => {
  return Math.random() * 0xffffff;
}
