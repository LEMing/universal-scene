import * as THREE from 'three';

import Tube from './Tube';

interface ICableParams {
  curves: THREE.QuadraticBezierCurve3[];
}

export default class Cables {
  private readonly curves: THREE.QuadraticBezierCurve3[];

  constructor({curves}: ICableParams) {
    this.curves = curves;
  }

  private generatePrimaryCables() {
    const mainCablesGroup = new THREE.Group();
    this.curves.forEach((curve) => {
      const tube = new Tube({curve});
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
