import range from 'lodash/range';
import {MathUtils, Vector3} from 'three';
import Plant from './Plant';
import * as THREE from 'three';
class LSystem {
  private readonly axiom: string;
  private count: number;
  private sentence: string;
  private length: number;
  constructor() {
    this.axiom = 'F';
    this.sentence = this.axiom;
    this.count = 0;
    this.calculate();
    this.length = 0.1;
  }
  rules() {
    return [
      {
        a: 'F',
        b: 'FF-[-F+F+F]+[+F-F-F]'
      }
    ]
  }
  generateDNA(count: number = 1) {
    range(count).forEach(() => {
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
      this.count++;
    })
  }
  calculate() {
    this.generateDNA(3);
    console.log("Generation " + this.count + ": " + this.sentence);
  }
  getPlants() {
    // this.sentence = 'FF+[+F-F-F]-[-F+F+F]';
    const plants: Plant[] = [];
    let currentPosition: THREE.Vector3 = new Vector3();
    let angle = 0;
    let savedPoints: THREE.Vector3[] = [new THREE.Vector3()];
    let savedAngles: number[] = [];
    for ( let i = 0; i < this.sentence.length; i++) {
      const c = this.sentence[i];
      switch (c) {
        case 'F': {
          // Draw a line
          const alfa = MathUtils.degToRad(90 - angle);
          const x = currentPosition.x + this.length * Math.cos(alfa);
          const y = currentPosition.y + this.length * Math.sin(alfa);
          const z = 0;
          const nextPoint = new THREE.Vector3(x, y, z);
          const plant = new Plant({a: currentPosition.clone(), b: nextPoint});
          currentPosition = nextPoint.clone();
          plants.push(plant);
          break;
        }
        case '+': {
          // Turn right
          angle += 25.7;
          break;
        }
        case '-': {
          // Turn left
          angle -= 25.7;
          break;
        }
        case '[': {
          // Save position and angle
          savedPoints.push(currentPosition.clone());
          savedAngles.push(angle);
          break;
        }
        case ']': {
          // Load position and angle
          const savedPoint = savedPoints.pop();
          const savedAngle = savedAngles.pop();
          if (savedPoint) {
            currentPosition = savedPoint.clone();
          }
          if (savedAngle) {
            angle = savedAngle;
          }
          break;
        }
      }
    }
    // console.log({plants})
    return plants;
  }
}

export default LSystem;
