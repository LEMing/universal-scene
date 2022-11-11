import {createBoxOrSphere} from '../../components/utils';
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
    const end = createBoxOrSphere({
      size: new THREE.Vector3(0.1, 0.1, 0.1),
      name: 'end',
      color: 0xFF0000,
      type: 'sphere',
    })
    end.position.copy(this.pointB());
    const start = end.clone();
    start.position.copy(this.pointA())
    this.group.add(mesh)
    // this.group.add(end)
    // this.group.add(start)
    return this.group;
  }

}

export default Plant;
