import {createBoxOrSphere} from '../../../components/utils';
import * as THREE from 'three';
import DrawableObject from '../DrawableObject';

class Leaf extends DrawableObject {
  public readonly position: THREE.Vector3;
  public reached: boolean = false;
  constructor({position}: {position: THREE.Vector3}) {
    super();
    this.position = position;
  }
  get color() {
    if (this.reached) {
      return 0x00000;
    }
    return 0x00FF00;
  }
  draw() {
    const object3d = createBoxOrSphere({
      name: 'Leaf',
      type: 'box',
      size: new THREE.Vector3(0.3, 0.3, 0.3),
      color: this.color,
    });
    object3d.position.copy(this.position);
    this.group.add(object3d);
    return this.group;
  }
}

export default Leaf;
