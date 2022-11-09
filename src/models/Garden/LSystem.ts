import range from 'lodash/range';
import {Vector3} from 'three';
import Plant from './Plant';
import * as THREE from 'three';
class LSystem {
  private current: string;
  private count: number;
  constructor() {
    this.current = 'X';
    this.count = 0;
    this.calculate();
  }
  getNext(count: number = 1) {
    let next: string[] = [];
    range(count).forEach(() => {
      // Look through the current String to replace according to L-System rules
      for ( let i = 0; i < this.current.length; i++) {
        const c = this.current[i];
        switch (c) {
          case 'F': {
            // Draw a line
            next.push('FX');
            break;
          }
          case 'X': {
            // Move forward
            // next.push('F+[[X]-X]-F[-FX]+X');
            next.push('F+[[X]-X]-F[-FX]+X');
            break;
          }
        }
      }
      this.current = next.join('');
    })
    return next.join('');
  }
  calculate() {
    // The current String is now the next one
    this.getNext(3);
    // Print to message console
    console.log("Generation " + this.count + ": " + this.current);
    this.count++;
  }
  getPlants() {
    const plants: Plant[] = [];
    let currentPosition = new Vector3();
    let bCoordinate = new Vector3().copy(currentPosition.add(new THREE.Vector3(0, 1, 0)));
    let savedPoint = currentPosition;

    for ( let i = 0; i < this.current.length; i++) {
      const c = this.current[i];
      console.log({c})
      switch (c) {
        case 'F': {
          // Draw a line
          const plant = new Plant({a: currentPosition, b: bCoordinate});
          plants.push(plant);
          currentPosition = bCoordinate;
          bCoordinate = new Vector3().copy(currentPosition.add(new THREE.Vector3(0, 1, 0)));

          break;
        }
        case '+': {
          // Turn right
          bCoordinate.applyEuler(new THREE.Euler(0, 0,THREE.MathUtils.degToRad(15)));
          break;
        }
        case '-': {
          // Turn left
          bCoordinate.applyEuler(new THREE.Euler(0, 0,THREE.MathUtils.degToRad(-15)));
          break;
        }
        case '[': {
          savedPoint = currentPosition;
          break;
        }
        case ']': {
          currentPosition = savedPoint;
          break;
        }
      }
    }
    console.log({plants})
    return plants;
  }
}

export default LSystem;
