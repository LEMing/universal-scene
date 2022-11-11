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
    this.axiom = 'F';
    this.sentence = this.axiom;
    this.countOfGenerations = generations;
    this.transformAngle = 25;
    this.length = 0.25;
    this.plants = [];
    this.calculate();
  }
  rules() {
    return [
      {
        a: 'F',
        b: 'FF+[+F-F-F]-[-F+F+F]'
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
    let currentAngle = 0;
    let savedPoints: THREE.Vector3[] = [new THREE.Vector3()];
    let savedAngles: number[] = [0];
    for ( let i = 0; i < this.sentence.length; i++) {
      const c = this.sentence[i];
      switch (c) {
        case 'F': {
          // Draw a line
          console.log(currentAngle);
          const alfa = MathUtils.degToRad(90 - currentAngle);
          const x = currentPosition.x + this.length * Math.cos(alfa);
          const y = currentPosition.y + this.length * Math.sin(alfa);
          const z = 0;
          const nextPoint = new THREE.Vector3(x, y, z);
          const plant = new Plant({a: currentPosition.clone(), b: nextPoint});
          currentPosition = nextPoint.clone();
          this.plants.push(plant);
          break;
        }
        case '+': {
          // Turn right
          currentAngle += this.transformAngle;
          break;
        }
        case '-': {
          // Turn left
          currentAngle -= this.transformAngle;
          break;
        }
        case '[': {
          // Save position and angle
          savedPoints.push(currentPosition.clone());
          savedAngles.push(currentAngle);
          break;
        }
        case ']': {
          // Load position and angle
          const savedPoint = savedPoints.pop();
          if (savedPoint) {
            currentPosition = savedPoint.clone();
          }

          const savedAngle = savedAngles.pop()
          console.log('savedAngles.pop()');
          if (savedAngle || (savedAngle === 0)) {
            currentAngle = savedAngle;
            console.log({currentAngle})
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
