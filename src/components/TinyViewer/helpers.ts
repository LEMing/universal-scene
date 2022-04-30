import * as THREE from 'three';

interface GridHelperProps {
  size?: number,
  divisions?: number,
}
export const createGridHelper = (props: GridHelperProps = {}) => {
  const {
    size = 10,
    divisions = 10
  } = props;
  const helper = new THREE.GridHelper(size, divisions);
  helper.castShadow = false;
  helper.receiveShadow = false;
  return helper;
};

export const createOrdHelper = () => {
  return new THREE.AxesHelper(5);
};

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
