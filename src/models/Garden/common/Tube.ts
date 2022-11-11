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
  tubularSegments: 32,
  radius: 0.25,
  radiusSegments: 64,
  color: 0xA46755,
};

export default class Tube {
  private options: ITubeOptions;
  private readonly curve: THREE.QuadraticBezierCurve3;

  constructor({options, curve}: ITubeParams) {
    this.curve = curve;
    this.options = {...DEFAULT_OPTIONS, ...options};
  }

  private createGeometry() {
    return new THREE.TubeGeometry(
      this.curve,
      this.options.tubularSegments,
      this.options.radius,
      this.options.radiusSegments,
      true,
    );
  }

  private createMaterial() {
    return new THREE.MeshPhysicalMaterial({
      color: this.options.color,
      sheen: 0.1,
      clearcoat: 0.5,
      roughness: 0.5
    });
  }

  createObject3D() {
    const material = this.createMaterial();
    const geometry = this.createGeometry();
    return new THREE.Mesh(geometry, material);
  }
}
