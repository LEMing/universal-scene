import {createBoxOrSphere} from '../../../components/utils';
import * as THREE from 'three';
import Cables from '../common/Cables';
import Curve from '../common/Curve';
import DrawableObject from '../DrawableObject';
import BranchLeaf from './BranchLeaf';

class Branch extends DrawableObject {
  public readonly position: THREE.Vector3;
  public count: number = 0;
  public parent: Branch | null;
  public childs: Branch[] = [];
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
    this.count = 0;
  }
  getBranchLeaf() {
    if (this.childs.length === 0) {
      return new BranchLeaf({direction: this.direction}).draw();
    }
  }
  getBranchRoot() {
    return createBoxOrSphere({name: 'Branch', type: 'sphere', size: new THREE.Vector3(0.25, 0.24, 0.24), color: 0x8D5C52});
  }
  getBranchStick(): THREE.Object3D {
    if (this.parent) {
      const curves = new Curve({startPoint: this.parent.position, endPoint: this.position}).curve;
      const cables = new Cables({curves: [curves], thickness: 0.25, color: 0x8D5C52});
      return cables.object3d;
    }
    throw new Error('Cannot get Branch stick');
  }
  draw() {
    if (this.parent) {
      const a = this.getBranchRoot();
      a.position.copy(this.parent.position);

      const b = this.getBranchLeaf();
      if (b) {
        b.position.copy(this.position);
        this.group.add(b);
      }
      const stick = this.getBranchStick();
      this.group.add(stick);
      this.group.add(a);

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
    this.childs.push(nextBranch);
    return nextBranch;
  }
}

export default Branch;
