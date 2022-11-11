import {createBoxOrSphere} from '../../components/utils';
import Cables from './Cables';
import DrawableObject from './DrawableObject';
import {IPlant} from './types';
import * as THREE from 'three';
import grassTexture from './textures/TexturesCom_Grass0126_1_seamless_S_128.jpg';
import {getCablePaths} from './utils';

class Plant extends DrawableObject {
  private readonly a: THREE.Vector3;
  private readonly b: THREE.Vector3;
  public connectedPlants: Map<string, Plant[]>;
  constructor({a, b}: IPlant) {
    super();
    this.a = a;
    this.b = b;
    this.connectedPlants = new Map();
  }
  getTexture() {
    return grassTexture;
  }
  pointA() {
    return this.a;
  }
  addConnectedPlants(plant: Plant, point: string) {
    const plants = this.connectedPlants.get(point);
    if (plants) {
      this.connectedPlants.set(point, [...plants, plant]);
    } else {

    }
    this.connectedPlants.set(point, [plant]);
  }
  pointB() {
    return this.b;
  }
  get height() {
    return this.a.distanceTo(this.b);
  }
  draw() {
    const curve = getCablePaths([this.pointA(), this.pointB()]);
    const mesh = new Cables({curves: curve, }).object3d;
    const jointRadius = 0.29 / 2;
    const end = createBoxOrSphere({
      size: new THREE.Vector3(jointRadius, jointRadius, jointRadius),
      name: 'end',
      color: 0xA46755,
      type: 'sphere',
    })
    end.position.copy(this.pointB());
    const start = end.clone();
    start.position.copy(this.pointA())
    this.group.add(mesh)
    this.group.add(end);
    this.group.add(start)
    return this.group;
  }

}

export default Plant;
