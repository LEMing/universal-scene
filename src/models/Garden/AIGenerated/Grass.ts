import * as THREE from 'three';
import DrawableObject from '../DrawableObject';
import {generateRealisticGrass} from './utils';
import grassBitmap from '../textures/grass/grass1-albedo3.png';
import grassRough from '../textures/grass/grass1-height.png';
import grassAlfa from '../textures/grass/grass1-ao.png';
class Grass extends DrawableObject {

  public readonly position: THREE.Vector3;
  public reached: boolean = false;
  constructor({position}: {position: THREE.Vector3}) {
    super();
    this.position = position;
  }
  get color() {
    if (this.reached) {
      return 0x00000;
    }
    return 0x00FF00;
  }

  draw() {
    const grassTexture = new THREE.TextureLoader().load(grassBitmap);
    const grassDisplacementMap = new THREE.TextureLoader().load(grassRough );
    const grassAlphaMap = new THREE.TextureLoader().load(grassAlfa);
    const object3d = generateRealisticGrass(24, 24, grassTexture, grassDisplacementMap, grassAlphaMap );
    this.group.add(object3d);
    return this.group;
  }
}

export default Grass;
