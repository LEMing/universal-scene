import * as THREE from 'three';
import {createBoxOrSphere} from '../../components/utils';
import range from 'lodash/range';
import {IPlanet} from './types';
import {getRandomColor} from './utils';
import earthMap4k from './textures/8081_earthmap4k.jpg';
import moonMap4k from './textures/moonmap4k.jpg';

class Planet {
  public readonly radius: number;
  protected angle: number;
  public planets?: Planet[];
  private readonly distance: number;
  private readonly orbitSpeed: number;
  readonly planetGroup: THREE.Group;
  private readonly color: number;
  private type: 'Moon' | 'Earth';
  constructor({radius, angle, distance, color, type}: IPlanet) {
    this.radius = radius;
    this.angle = angle || 0;
    this.distance = distance || 0;
    this.orbitSpeed = THREE.MathUtils.randInt(1, 5) / 50;
    this.planetGroup = new THREE.Group();
    this.color = color || getRandomColor();
    this.type = type;
    this.addPlanet();
  }
  spawnMoons(total: number) {
    const moonsColor = getRandomColor()
    this.planets = range(total).map(() => new Planet({
      radius: this.radius / 3,
      color: moonsColor,
      type: 'Moon',
      distance: THREE.MathUtils.randInt(this.radius * 3, this.radius * 3),
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
      const v = new THREE.Vector3(satellite.distance, 0, 0).applyEuler(e);
      object3d.position.copy(v);
    });
  }
  getTexture() {
    switch (this.type) {
      case 'Earth': return earthMap4k;
      case 'Moon': return moonMap4k;
    }
  }
  async addPlanet() {
    const planet = createBoxOrSphere(
      {size: new THREE.Vector3().setScalar(this.radius),
        name: 'Planet',
        color: this.color,
        type: 'sphere',
      });
    const texture = new THREE.TextureLoader().load( this.getTexture() );

    const material = new THREE.MeshPhysicalMaterial( { map: texture } );
    material.transparent = true;
    material.opacity = 0.8;
    planet.material = material;
    this.planetGroup.add(planet);
  }
  draw() {
    return this.planetGroup;
  }
}

export default Planet;
