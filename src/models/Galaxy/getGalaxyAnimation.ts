import * as THREE from "three";
import Planet from './Planet';

const getGalaxyAnimation = (scene: THREE.Scene, planets: Planet[]) => {
  planets.forEach(planet => {
    planet.orbit();
    planet.planets?.forEach((moon) => {
      moon.orbit();
      moon.planets?.forEach(satellite => {
        satellite.orbit();
        satellite.planets?.forEach(asteroid => {
          asteroid.orbit();
        })
      })
    })
    scene.updateMatrix();
  })
}

export default getGalaxyAnimation;
