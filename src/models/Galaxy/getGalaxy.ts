import FenceAroundPlanet from './FenceAroundPlanet';
import Planet from './Planet';
import * as THREE from 'three';

const getGalaxy = () => {
  const galaxy: FenceAroundPlanet[] = [];
  const planet = new Planet({radius: 50 * 12, angle: 0, type: 'Earth'});

  planet.spawnMoons(2);
  planet.planets?.forEach((moon) => {
       moon.spawnMoons(THREE.MathUtils.randInt(0, 1));
  })
  const fencePlanet = new FenceAroundPlanet(planet);
  galaxy.push(fencePlanet);
  return galaxy;
}

export default getGalaxy;
