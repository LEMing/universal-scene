import * as THREE from 'three';

interface CreateCube {
  name: string;
  color?: number;
}

export const createCube = (props: CreateCube) => {
  const {
    name,
    color = 0x333333,
  } = props;
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial( { color} );
  const cube = new THREE.Mesh(geometry, material);
  cube.name = name;
  return cube;
}
