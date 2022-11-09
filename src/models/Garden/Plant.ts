import Cables from './Cables';
import {IPlant} from './types';
import * as THREE from 'three';
import grassTexture from './textures/TexturesCom_Grass0126_1_seamless_S_128.jpg';
import {getCablePaths} from './utils';

class Plant {
  public readonly group: THREE.Group;
  private readonly a: THREE.Vector3;
  private readonly b: THREE.Vector3;
  constructor({a, b}: IPlant) {
    this.a = a;
    this.b = b;
    this.group = new THREE.Group();
  }
  getTexture() {
    return grassTexture;
  }
  pointA() {
    return this.a;
  }
  pointB() {
    return this.b;
  }
  get height() {
    return this.a.distanceTo(this.b);
  }
  draw() {
    const curve = getCablePaths([this.pointA(), this.pointB()]);
    const mesh = new Cables({curves: curve}).object3d;
    this.group.add(mesh)
    return this.group;
  }

}

export default Plant;
