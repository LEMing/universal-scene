import range from 'lodash/range';
import {MathUtils, Vector3} from 'three';
import Plant from './Plant';
import * as THREE from 'three';

interface ILSystem {
  generations: number;
  position: THREE.Vector3;
}
class LSystem {
  private readonly axiom: string;
  private readonly countOfGenerations: number;
  private sentence: string;
  private length: number;
  private readonly transformAngle: number;
  private readonly plants: Plant[];
  private readonly rootPosition: THREE.Vector3;
  constructor({generations, position}: ILSystem) {
    this.rootPosition = position;
    this.axiom = 'X';
    this.sentence = this.axiom;
    this.countOfGenerations = generations;
    this.transformAngle = 360 / 9;
    this.length = 0.25;
    this.plants = [];
    this.calculate();
  }
  rules() {
    return [
      {
        a: 'X',
        b: 'F[+@X]F[-#X]+X'
      },
      {
        a: 'F',
        b: 'FF'
      }
    ]
  }
  generateDNA() {
    let nextSentence: string = '';
    // Look through the current String to replace according to L-System rules
    for ( let i = 0; i < this.sentence.length; i++) {
      const current = this.sentence[i];
      let found = false;
      this.rules().forEach(rule => {
        if (current === rule.a) {
          found = true;
          nextSentence+= rule.b;
        }
      });
      if (!found) {
        nextSentence += current;
      }
    }
    console.log(nextSentence)
    this.sentence = nextSentence;
  }
  calculate() {
    range(this.countOfGenerations).forEach(() => {
      this.generateDNA();
    })
    this.length *= 0.5 * this.countOfGenerations;
    this.generatePlants();
    console.log("Generation " + this.countOfGenerations + ": " + this.sentence);
  }
  generatePlants() {
    let currentPosition: THREE.Vector3 = new Vector3().copy(this.rootPosition);
    let currentAngleX = 0;
    let currentAngleZ = 0;
    let savedPoints: THREE.Vector3[] = [new THREE.Vector3()];
    let savedAnglesX: number[] = [0];
    let savedAnglesZ: number[] = [0];
    for ( let i = 0; i < this.sentence.length; i++) {
      const c = this.sentence[i];
      switch (c) {
        case 'F': {
          // Draw a line
          console.log(currentAngleX);
          const alfaX = MathUtils.degToRad(90 - currentAngleX);
          const alfaZ = MathUtils.degToRad(90 - currentAngleZ);
          const x = currentPosition.x + this.length * Math.cos(alfaX);
          const y = currentPosition.y + this.length * Math.sin(alfaX);
          const z = currentPosition.z + this.length * Math.cos(alfaZ);
          const nextPoint = new THREE.Vector3(x, y, z);
          const plant = new Plant({a: currentPosition.clone(), b: nextPoint});
          currentPosition = nextPoint.clone();
          this.plants.push(plant);
          break;
        }
        case '+': {
          // Turn right
          currentAngleX += this.transformAngle;
          break;
        }
        case '-': {
          // Turn left
          currentAngleX -= this.transformAngle;
          break;
        }
        case '@': {
          // turn around z
          currentAngleZ += this.transformAngle;
          break;
        }
        case '#': {
          // turn back around z
          currentAngleZ -= this.transformAngle;
          break;
        }
        case '[': {
          // Save position and angle
          savedPoints.push(currentPosition.clone());
          savedAnglesX.push(currentAngleX);
          break;
        }
        case ']': {
          // Load position and angle
          const savedPoint = savedPoints.pop();
          if (savedPoint) {
            currentPosition = savedPoint.clone();
          }

          const savedAngleX = savedAnglesX.pop()
          if (savedAngleX || (savedAngleX === 0)) {
            currentAngleX = savedAngleX;
          }
          const savedAngleZ = savedAnglesZ.pop()
          if (savedAngleZ || (savedAngleZ === 0)) {
            currentAngleZ = savedAngleZ;
          }
          break;
        }
      }
    }
  }
  getPlants() {
    return this.plants;
  }
}

export default LSystem;
