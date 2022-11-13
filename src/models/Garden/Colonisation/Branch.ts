import {createBoxOrSphere} from '../../../components/utils';
import * as THREE from 'three';
import Cables from '../common/Cables';
import Curve from '../common/Curve';
import DrawableObject from '../DrawableObject';

class Branch extends DrawableObject {
  public readonly position: THREE.Vector3;
  public count: number = 0;
  public parent: Branch | null;
  public direction: THREE.Vector3;
  public origDirection: THREE.Vector3;
  private length: number;
  constructor({position, parent, direction}: {position: THREE.Vector3, parent: Branch | null, direction: THREE.Vector3 }) {
    super();
    this.position = position;
    this.direction = direction;
    this.origDirection = direction.copy(this.direction);
    this.parent = parent;
    this.length = 1;
  }
  reset() {
    this.direction = this.origDirection.clone();
  }
  draw() {
    if (this.parent) {
      const a = createBoxOrSphere({name: 'Branch', type: 'box', size: new THREE.Vector3(0.25, 0.25, 0.25), color: 0xFF00FF});
      a.position.copy(this.parent.position);
      const b = createBoxOrSphere({name: 'Branch', type: 'sphere', size: new THREE.Vector3(0.13, 0, 0), color: 0xFFFF00});
      b.position.copy(this.position);
      const curves = new Curve({startPoint: this.parent.position, endPoint: this.position}).curve;
      const cables = new Cables({curves: [curves], thickness: 0.1, color: 0x0000FF});
      this.group.add(cables.object3d);
      this.group.add(a);
      this.group.add(b);
    }
    if (!this.parent) {
      const a = createBoxOrSphere({name: 'Branch', type: 'sphere', size: new THREE.Vector3(0.25, 0, 0), color: 0xFF0000});
      a.position.copy(this.position);
      this.group.add(a);
    }
    return this.group;
  }
  next() {
    const nextDirection = this.direction.clone().multiplyScalar(this.length)
    const nextPosition = new THREE.Vector3().add(nextDirection.clone()).add(this.position.clone());
    const nextBranch = new Branch({parent: this, position:  nextPosition, direction: this.direction.clone()});
    return nextBranch;
  }
}

export default Branch;
