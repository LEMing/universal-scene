
import * as THREE from 'three';
import {getMiddlePoint} from '../utils';

interface ICurveParams {
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
}

class Curve {
  private readonly startPoint: THREE.Vector3;
  private readonly endPoint: THREE.Vector3;
  public curve: THREE.QuadraticBezierCurve3;
  constructor({startPoint, endPoint}: ICurveParams) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.curve = this.createCurve();
  }

  private createCurve() {
    const midPoint = this.getMidPoint();
    return new THREE.QuadraticBezierCurve3(this.startPoint, midPoint, this.endPoint);
  }

  private getMidPoint() {
    const midPoint = getMiddlePoint(this.startPoint, this.endPoint);
    const offset = this.startPoint.distanceTo(this.endPoint) / 4;
    return new THREE.Vector3(midPoint.x, midPoint.y - offset, midPoint.z);
  }
}

export default Curve;
