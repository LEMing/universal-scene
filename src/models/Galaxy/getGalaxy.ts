import Planet from './Planet';
import * as THREE from 'three';

const getGalaxy = () => {
  const galaxy: Planet[] = [];
  const planet = new Planet({radius: 1, angle: 0, type: 'Earth'});
  planet.spawnMoons(1);
  planet.planets?.forEach(moon => moon.spawnMoons(THREE.MathUtils.randInt(0, 0)))
  galaxy.push(planet);
  return galaxy;
}

export default getGalaxy;
