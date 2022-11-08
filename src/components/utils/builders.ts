import * as THREE from 'three';

interface CreateObject3D {
  size?: THREE.Vector3;
  name: string;
  color?: number;
  type?: 'box' | 'sphere';
}

export const createBoxOrSphere = (props: CreateObject3D) => {
  const DEFAULT_SIZE = new THREE.Vector3(1, 1, 1);
  const {
    size = DEFAULT_SIZE,
    name,
    color = 0x333333,
  } = props;

  const geometry = props.type === 'sphere'
    ? new THREE.SphereGeometry(size.length(), 32, 32)
    : new THREE.BoxGeometry(size.x, size.y, size.z);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    sheen: 0.1,
    clearcoat: 0.5,
    roughness: 0.5
  } );
  const cube = new THREE.Mesh(geometry, material);
  cube.name = name;
  return cube;
}
