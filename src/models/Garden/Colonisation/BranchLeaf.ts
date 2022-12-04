import * as THREE from 'three';
import {createBoxOrSphere} from '../../../components/utils';
import {viewerUtils} from 'tiny-viewer';
import DrawableObject from '../DrawableObject';
const {createCylinder} = viewerUtils;
class BranchLeaf extends DrawableObject {
  private readonly a: THREE.Vector3;
  private b: THREE.Vector3;
  constructor({direction}: {direction: THREE.Vector3}) {
    super();
    this.a = new THREE.Vector3();
    this.b = new THREE.Vector3().add(direction.clone()).add(this.a.clone());
  }
  createAlignedCylinder() {
    const cylinder = createCylinder({
      radiusTop: 0.1,
      radiusBottom: 0.1,
      height: 1,
      color: 0x00FF00,
    });
    cylinder.position.copy((this.a));
    const stickAxis = new THREE.Vector3().copy(this.a).sub(this.b).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion);
    return cylinder;
  }
  draw() {
    const leaf = createBoxOrSphere({name: 'Branch', type: 'sphere', size: new THREE.Vector3(1, 0, 0), color: 0x007106});
    this.group.add(leaf);
    const cylinder = this.createAlignedCylinder();
    this.group.add(cylinder);
    return this.group;
  }
}

export default BranchLeaf;
