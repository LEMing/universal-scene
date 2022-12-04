import DrawableObject from '../DrawableObject';
import Tree from './Tree';
import * as THREE from 'three';
import range from 'lodash/range';

const getColonialGarden = () => {
  const garden: DrawableObject[] = [];
  // const minDist: number = 0.1;
  // const maxDist: number = 10;
  const tree = new Tree();
  range(40).forEach(() => tree.grow())
  tree.group.position.copy(new THREE.Vector3(0, 0, 0))
  garden.push(tree);
  return garden;
}

export default getColonialGarden;
