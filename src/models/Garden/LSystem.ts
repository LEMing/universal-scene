import range from 'lodash/range';
import {MathUtils, Vector3} from 'three';
import DrawableObject from './DrawableObject';
import Leaf from './Leaf';
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
  private readonly plants: DrawableObject[];
  private readonly rootPosition: THREE.Vector3;
  private readonly leavesPositions: THREE.Vector3[];
  private readonly showLeaves: boolean;
  constructor({generations, position}: ILSystem) {
    this.rootPosition = position;
    this.axiom = 'X';
    this.sentence = this.axiom;
    this.countOfGenerations = generations;
    this.transformAngle = 360 / 9;
    this.length = 0.25;
    this.plants = [];
    this.leavesPositions = [];
    this.showLeaves = true;
    this.calculate();
  }
  rules() {
    return [
      {
        a: 'X',
        b: 'F[+@X]F[-#X]+@X'
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
    this.sentence = nextSentence;
  }
  calculate() {
    range(this.countOfGenerations).forEach(() => {
      this.generateDNA();
    })
    this.length *= 0.5 * this.countOfGenerations;
    this.generatePlants();
    if (this.showLeaves) {
      this.calculateLeaves();
      this.generateLeaves();
    }
    console.log("Generation " + this.countOfGenerations + ": " + this.sentence);
  }
  calculateLeaves() {
    for (let i = 0; i < this.plants.length; i++) {
      const plant = this.plants[i] as Plant;
      for (let j = 0; j < this.plants.length; j++) {
        if (i !== j) {
          const anotherPlant = this.plants[j] as Plant;
          const isZeroDistanceAA = plant.pointA().distanceTo(anotherPlant.pointA()) < 0.1;
          const isZeroDistanceAB = plant.pointA().distanceTo(anotherPlant.pointB()) < 0.1;
          if (isZeroDistanceAA || isZeroDistanceAB) {
            plant.addConnectedPlants(anotherPlant, 'A');
          }
          const isZeroDistanceBB = plant.pointB().distanceTo(anotherPlant.pointB()) < 0.1;
          const isZeroDistanceBA = plant.pointB().distanceTo(anotherPlant.pointA()) < 0.1;
          if (isZeroDistanceBA || isZeroDistanceBB) {
            plant.addConnectedPlants(anotherPlant, 'B');
          }
        }
      }
    }
    this.plants.forEach((plant) => {
      const forSurePlant = plant as Plant;
      const isItRoot = forSurePlant.pointA().distanceTo(this.rootPosition) === 0;
      if (forSurePlant.connectedPlants.size === 1 && !isItRoot) {
        this.leavesPositions.push(forSurePlant.pointB());
      }
    });
    console.log({leaves: this.leavesPositions});
  }
  generateLeaves() {
    this.leavesPositions.forEach(position => {
      const leaf = new Leaf({position});
      this.plants.push(leaf);
    })
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
          const alfaX = MathUtils.degToRad(90 - currentAngleX);
          const alfaZ = MathUtils.degToRad(90 - currentAngleZ);
          const x = currentPosition.x + this.length * Math.cos(alfaX);
          const y = currentPosition.y + this.length * Math.sin(alfaX);
          const z = currentPosition.z + this.length * Math.cos(alfaZ);
          const nextPoint = new THREE.Vector3(x, y, z);
          const distanceToRoot = this.rootPosition.distanceTo(currentPosition);
          const thickness = 1 / ((distanceToRoot * 0.1) + 0.5);
          const plant = new Plant({a: currentPosition.clone(), b: nextPoint, thickness});
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
  filterOutRedundantPlants(plant) {
    if (plant instanceof Plant) {
      const myPlant = plant as Plant;
      const aConnected = myPlant.connectedPlants.get('A');
      const bConnected = myPlant.connectedPlants.get('B');
      const aIsMoreThanOne = aConnected && aConnected.length > 1;
      const bIsMoreThanOne = bConnected && bConnected.length > 1;
      return aIsMoreThanOne || bIsMoreThanOne;
    }
    return true;
  }
  getPlants() {
    console.log(this.plants)
    return this.plants;//.filter(this.filterOutRedundantPlants);
  }
}

export default LSystem;
