import Planet from './Planet';
import * as THREE from 'three';

const getGalaxy = () => {
  const galaxy: Planet[] = [];
  const planet = new Planet({radius: 1, angle: 0});
  planet.spawnMoons(20)
  planet.planets?.forEach(moon => moon.spawnMoons(THREE.MathUtils.randInt(2, 20)))
  galaxy.push(planet);
  return galaxy;
}

export default getGalaxy;
