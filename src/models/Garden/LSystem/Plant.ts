import {createBoxOrSphere} from '../../../components/utils';
import {createCylinder} from '../../../components/utils/builders';
import DrawableObject from '../DrawableObject';
import {IPlant} from './types';
import * as THREE from 'three';
import grassTexture from '../textures/TexturesCom_Grass0126_1_seamless_S_128.jpg';
import {getMiddlePoint} from '../utils';
// import {getCablePaths} from '../utils';
// import Cables from '../Cables';

class Plant extends DrawableObject {
  private readonly a: THREE.Vector3;
  private readonly b: THREE.Vector3;
  public connectedPlants: Map<string, Plant[]>;
  private readonly thickness: number;
  private readonly length: number;
  constructor({a, b, thickness}: IPlant) {
    super();
    this.a = a;
    this.b = b;
    this.thickness = thickness;
    this.connectedPlants = new Map();
    this.length = a.distanceTo(b);
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
      this.connectedPlants.set(point, [plant]);
    }
  }
  pointB() {
    return this.b;
  }
  get height() {
    return this.a.distanceTo(this.b);
  }
  draw() {
    // const curve = getCablePaths([this.pointA(), this.pointB()]);
    // const mesh = new Cables({curves: curve, thickness: this.thickness}).object3d;
    const jointRadius = this.thickness / 2;
    const cylinder = createCylinder({
      radiusTop: this.thickness,
      radiusBottom: this.thickness,
      height: this.length,
    });
    cylinder.position.copy((this.pointA()));
    const stickAxis = new THREE.Vector3().copy(this.pointA()).sub(this.pointB()).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion)
    const end = createBoxOrSphere({
      size: new THREE.Vector3(jointRadius, jointRadius, jointRadius),
      name: 'end',
      color: 0xA46755,
      type: 'sphere',
    })

    end.position.copy(this.pointB());
    const start = end.clone();
    const inter = end.clone();
    const interA = end.clone();
    const interB = end.clone();
    inter.position.copy(getMiddlePoint(this.a, this.b));
    interA.position.copy(getMiddlePoint(inter.position, this.a));
    interB.position.copy(getMiddlePoint(inter.position, this.b));
    start.position.copy(this.pointA())
    // this.group.add(mesh)
    this.group.add(end);
    this.group.add(interA);
    this.group.add(inter);
    this.group.add(interB);
    this.group.add(start)
    // this.group.add(cylinder)
    return this.group;
  }

}

export default Plant;
