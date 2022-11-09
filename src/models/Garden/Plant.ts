import {IPlant} from './types';
import * as THREE from 'three';

class Plant {
  private readonly height: number;
  constructor({height}: IPlant) {
    this.height = height;
  }
  draw() {
    const group = new THREE.Group();
    const cylinderGeometry = new THREE.CylinderGeometry(0.1,0.067, this.height);
    const material = new THREE.MeshPhysicalMaterial( {color: 0x00FF00});
    const mesh = new THREE.Mesh(cylinderGeometry, material);
    mesh.material = material;
    group.add(mesh)
    return group;
  }

}

export default Plant;
