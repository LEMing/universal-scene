import * as THREE from 'three';
import {createBoxOrSphere} from '../../components/utils';
import Planet from './Planet';

class Sun extends Planet {
  draw() {
    const planetGroup = new THREE.Group();
    const planet = createBoxOrSphere(
      {size: new THREE.Vector3().setScalar(this.radius),
        name: 'Sun',
        color: 0xFF0000,
        type: 'sphere',
      });
    planet.userData = {mass: 200, velocity: 0.01}
    planetGroup.add(planet);
    return planetGroup;
  }
}

export default Sun;
