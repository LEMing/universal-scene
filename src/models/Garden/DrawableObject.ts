import * as THREE from 'three';

abstract class DrawableObject {
  public readonly group: THREE.Group;
  protected constructor() {
    this.group = new THREE.Group();
  }
  abstract draw();
}


export default DrawableObject;
