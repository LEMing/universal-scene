import * as THREE from 'three';
import {createBox} from '../../components/utils';

const getGalaxy = () => {
  const galaxy = new THREE.Group();
  const cube = createBox({size: new THREE.Vector3(10, 10, 10), name: 'Milky Way', color: 0xFF0000});
  galaxy.add(cube);
  return galaxy;
}

export default getGalaxy;
