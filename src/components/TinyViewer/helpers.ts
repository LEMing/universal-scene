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
