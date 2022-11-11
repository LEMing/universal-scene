import * as THREE from 'three';

interface ITubeOptions {
  tubularSegments?: number;
  radius?: number;
  radiusSegments?: number;
  color?: THREE.ColorRepresentation;
}

interface ITubeParams {
  options?: ITubeOptions;
  curve: THREE.QuadraticBezierCurve3;
}

const DEFAULT_OPTIONS = {
  tubularSegments: 16,
  radius: 0.01,
  radiusSegments: 6,
  color: 0x00FF00,
};

export default class Tube {
  private options: ITubeOptions;
  private readonly curve: THREE.QuadraticBezierCurve3;

  constructor({options = DEFAULT_OPTIONS, curve}: ITubeParams) {
    this.curve = curve;
    this.options = options;
  }

  private createGeometry() {
    return new THREE.TubeGeometry(
      this.curve,
      this.options.tubularSegments,
      this.options.radius,
      this.options.radiusSegments,
      false,
    );
  }

  private createMaterial() {
    return new THREE.MeshPhysicalMaterial({color: this.options.color});
  }

  createObject3D() {
    const material = this.createMaterial();
    const geometry = this.createGeometry();
    return new THREE.Mesh(geometry, material);
  }
}
