import LSystem from './LSystem';
import Plant from './Plant';
import * as THREE from 'three';

const getGarden = () => {
  const garden: Plant[] = [];
  const plantsA = new LSystem({generations:5, position: new THREE.Vector3(0, 0, 0)}).getPlants();
  garden.push(...plantsA);

  return garden;
}

export default getGarden;
