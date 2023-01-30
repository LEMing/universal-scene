import {getProductFromSchemaCode} from 'cad';
import {createBoxOrSphere} from '../../components/utils';
import DrawableObject from '../Garden/DrawableObject';
import Planet from './Planet';
import {
  getRandomTubeOnSphere,
} from './utils';
import * as THREE from 'three';

class FenceAroundPlanet extends DrawableObject {
  private planet: Planet;
  constructor(planet: Planet) {
    super();
    this.planet = planet;
    this.init().then();
  }

  orbit() {
    this.planet.orbit();
  }
  calculateFencePoints() {
    const {tube, line, a, b} = getRandomTubeOnSphere(this.planet.radius);

    const pointA = createBoxOrSphere({size: new THREE.Vector3().setScalar(10), type: 'sphere', name: 'pointA', color: 0xFF0000});
    const pointB = createBoxOrSphere({size: new THREE.Vector3().setScalar(10), type: 'sphere', name: 'pointB', color: 0x0000FF});
    pointA.position.copy(a);
    pointB.position.copy(b);

    this.planet.planetGroup.add(pointA);
    this.planet.planetGroup.add(pointB);
    this.planet.planetGroup.add(tube);
    this.planet.planetGroup.add(line);
    return {points: [a, b]};
  }

  async getFence(startPoint: THREE.Vector3, endPoint: THREE.Vector3): Promise<THREE.Group> {
    console.log(startPoint, endPoint)
    const length = startPoint.distanceTo(endPoint) / 12;
    const fence = await getProductFromSchemaCode('&catalog_type=fence-side', {withGround: false, fenceSideLength: length});

    const stickAxis = new THREE.Vector3().copy(endPoint).sub(startPoint).normalize();
    const quaternion = new THREE.Quaternion();
    const cylinderUpAxis = new THREE.Vector3(1, 0, 0);
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis);

    // @ts-ignore
    fence.applyQuaternion(quaternion);
    fence.position.set(startPoint.x, startPoint.y, 0);
    // @ts-ignore
    return fence;
  }
  async init() {
    const {points} = this.calculateFencePoints();
    const pointA = points[0];
    const pointB = points[1];

    const fence = await this.getFence(pointA, pointB);
    this.planet.planetGroup.add(fence);
  }

  draw() {
    return this.planet.planetGroup;
  }
}

export default FenceAroundPlanet;
