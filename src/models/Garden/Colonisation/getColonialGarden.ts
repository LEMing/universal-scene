import * as THREE from 'three';
import DrawableObject from '../DrawableObject';
import LSystem from '../LSystem';

const getColonialGarden = () => {
  const garden: DrawableObject[] = [];
  const plantsA = new LSystem({generations:4, position: new THREE.Vector3(0, 0, 0)}).getPlants();
  garden.push(...plantsA);
  return garden;
}

export default getColonialGarden;
