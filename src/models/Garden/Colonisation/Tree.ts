import {Vector3} from 'three';
import DrawableObject from '../DrawableObject';
import Branch from './Branch';
import Leaf from './Leaf';
import range from 'lodash/range';
import {getRandomPointFromBox} from './utils';
import * as THREE from 'three';

class Tree extends DrawableObject {
  private _leaves: Leaf[] = [];
  private _branches: Branch[] = [];
  private readonly root: Branch;
  private minDist: number = 3;
  private maxDist: number = 20;
  private readonly position: Vector3;
  private readonly leavesVolume: THREE.Box3;
  constructor() {
    super();
    this.leavesVolume = new THREE.Box3(new THREE.Vector3(-10, 10, -10), new THREE.Vector3(10, 60, 10))
    this.createLeaves();
    this.position = new Vector3(0, 0, 0);
    this.root = new Branch({position: this.position, parent: null, direction: new Vector3(0, 1, 0)});
    this._branches.push(this.root);
    this.growToLeaves();
  }

  growToLeaves() {
    let current = this.root;
    let found = false;
    let loopsCounter = 0;
    const LOOPS_LIMIT = 10;
    while (!found) {
      loopsCounter++;
      this._leaves.forEach(leaf => {
        const distance = leaf.position.distanceTo(current.position);
        if (distance < this.maxDist) {
          found = true;
        }
      });
      if (!found) {
        console.log('Not found')
        const branch = current.next();
        current = branch;
        this.branches.push(branch);
      }
      if (loopsCounter > LOOPS_LIMIT) {
        throw new Error('Too many loops')
        break;
      }
    }
  }

  createLeaves() {
    this._leaves = [];
    range(300).forEach(() => {
      this._leaves.push(new Leaf({position: getRandomPointFromBox(this.leavesVolume)}));
    });
  }

  get leaves() {
    return this._leaves;
  }

  get branches() {
    return this._branches;
  }

  grow() {
    this.leaves.forEach(leaf => {

      let closestBranch: Branch | null = null;
      let record = this.maxDist;

      for (const branchKey in this.branches) {
        const branch = this.branches[branchKey];
        const distance = leaf.position.distanceTo(branch.position);
        if (distance < this.minDist) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (distance < record) {
          closestBranch = branch;
          record = distance;
        }
      }

      if (closestBranch !== null ) {
        const newDirection = leaf.position.clone().sub(closestBranch.position.clone());
        newDirection.normalize();
        if (closestBranch !== this.root) {
          closestBranch.direction.add(newDirection);
        }
        closestBranch.count++;
      }

    });

    for (let i = 0; i <  this.branches.length; i++) {
      const branch = this.branches[i];
      if (branch.count > 0) {
        branch.direction.divideScalar(branch.count);
        this.branches.push(branch.next());
        branch.reset();
      }
    }

    this.removeReachedLeafs();

  }

  removeReachedLeafs() {
    console.log('removeReachedLeafs');
    for (let i = this._leaves.length - 1; i >= 0; i--) {
      if (this._leaves[i].reached) {
        this._leaves[i].group.visible = false;
        this._leaves.slice(i, 1);
      }
    }
  }

  draw() {
    // this.leaves.forEach(leaf => this.group.add(leaf.draw()));
    this.branches.forEach(branch => this.group.add(branch.draw()));
    return this.group;
  }
}

export default Tree;
