import * as THREE from 'three';

import Tube from './Tube';

interface ICableParams {
  curves: THREE.QuadraticBezierCurve3[];
  thickness: number;
  color: number;
}

export default class Cables {
  private readonly curves: THREE.QuadraticBezierCurve3[];
  private readonly thickness: number;
  private color: number;

  constructor({curves, thickness, color}: ICableParams) {
    this.thickness = thickness;
    this.curves = curves;
    this.color = color;
  }

  private generatePrimaryCables() {
    const mainCablesGroup = new THREE.Group();
    this.curves.forEach((curve) => {
      const tube = new Tube({curve, options: {
          radius: this.thickness,
          color: this.color,
        }});
      mainCablesGroup.add(tube.createObject3D());
    });
    return mainCablesGroup;
  }

  get object3d() {
    const group = new THREE.Group();

    const mainCables = this.generatePrimaryCables();

    group.add(mainCables);
    return group;
  }
}
