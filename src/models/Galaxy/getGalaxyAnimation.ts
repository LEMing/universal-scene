import * as THREE from "three";
import Planet from './Planet';

const getGalaxyAnimation = (scene: THREE.Scene, planets: Planet[]) => {
  planets.forEach(planet => {
    planet.orbit();
    planet.planets?.forEach((moon) => moon.orbit())
    scene.updateMatrix();
  })
}

export default getGalaxyAnimation;
