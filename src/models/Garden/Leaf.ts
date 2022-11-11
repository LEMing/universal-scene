import * as THREE from 'three';
import {Vector3} from 'three';
import {createBoxOrSphere} from '../../components/utils';
import DrawableObject from './DrawableObject';

class Leaf extends DrawableObject {
  private readonly position: Vector3;
  public readonly group: THREE.Group;
  constructor({position}: {position: THREE.Vector3}) {
    super();
    this.position = position;
    this.group = new THREE.Group();
  }
  draw() {
    const leafObject3d = createBoxOrSphere({
      size: new THREE.Vector3(2, 2, 2),
      name: 'end',
      color: 0x00C12D,
      type: 'sphere',
    })
    leafObject3d.position.copy(this.position);
    this.group.add(leafObject3d);

    return this.group;
  }
}

export default Leaf
