import * as THREE from 'three';
import {createBoxOrSphere} from '../../components/utils';
import range from 'lodash/range';

interface IPlanet {
  radius: number;
  angle?: number;
  distance?: number;
}

class Planet {
  protected readonly radius: number;
  protected angle: number;
  public planets?: Planet[];
  private readonly distance: number;
  private readonly orbitSpeed: number;
  private readonly planetGroup: THREE.Group;
  constructor({radius, angle, distance}: IPlanet) {
    this.radius = radius;
    this.angle = angle || 0;
    this.distance = distance || 0;
    this.orbitSpeed = THREE.MathUtils.randInt(1, 5) / 10;
    this.planetGroup = new THREE.Group();
    this.addPlanet();
  }
  spawnMoons(total: number) {
    this.planets = range(total).map(() => new Planet({
      radius: this.radius / 4,
      distance: THREE.MathUtils.randInt(this.radius * 2, this.radius * 4),
      angle: THREE.MathUtils.randInt(0, 360)})
    );
    this.planets?.forEach(planet => this.planetGroup.add(planet.draw()));
  }
  orbit() {
    this.planets?.forEach((satellite) => {
      const object3d = satellite.draw();
      satellite.angle = satellite.angle + satellite.orbitSpeed;
      const e = new THREE.Euler(
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(satellite.angle),
        THREE.MathUtils.degToRad(0));
      const v = new THREE.Vector3().setScalar(satellite.distance).applyEuler(e);
      object3d.position.copy(v);
    });
  }
  addPlanet() {
    const planet = createBoxOrSphere(
      {size: new THREE.Vector3().setScalar(this.radius),
        name: 'Planet',
        color: 0x0000FF,
        type: 'sphere',
      });
    this.planetGroup.add(planet);
  }
  draw() {
    return this.planetGroup;
  }
}

export default Planet;
