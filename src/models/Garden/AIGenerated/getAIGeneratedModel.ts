import DrawableObject from '../DrawableObject';

import * as THREE from 'three';
import Water from './Water';
const getAIGeneratedModel = () => {
  const garden: DrawableObject[] = [];
  const myPlane = new Water({position: new THREE.Vector3()});
  garden.push(myPlane);
  return garden;
}

export default getAIGeneratedModel;
