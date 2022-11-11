import * as THREE from 'three';

import Tube from './Tube';

interface ICableParams {
  curves: THREE.QuadraticBezierCurve3[];
  thickness: number;
}

export default class Cables {
  private readonly curves: THREE.QuadraticBezierCurve3[];
  private readonly thickness: number;

  constructor({curves, thickness}: ICableParams) {
    this.thickness = thickness;
    this.curves = curves;
  }

  private generatePrimaryCables() {
    const mainCablesGroup = new THREE.Group();
    this.curves.forEach((curve) => {
      const tube = new Tube({curve, options: {
          radius: this.thickness,
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
