import {SelectorRow} from '../../components/ViewerWrapper/types';
import WorldFactory from '../WorldFactory';
import * as THREE from 'three';
import DrawableObject from './DrawableObject';
import getColonialGarden from './Colonisation/getColonialGarden';
import getGarden from './LSystem/getGarden';

export const GARDEN: SelectorRow[] = [
  {value: 'L-System', label: 'L-System'},
  {value: 'Colonisation', label: 'Colonisation'},
]

class GardenFactory extends WorldFactory {
  public garden: DrawableObject[];
  private group: THREE.Group;
  constructor() {
    super();
    this.dictionary = GARDEN;
    this.group = new THREE.Group();
    this.garden = []
  }
  savedToTheGroup() {
    this.group = new THREE.Group();
    this.garden.forEach(object => {
      this.group.add(object.draw())
    })
  }
  getModelByLabel(label: string) {
    if (label === 'L-System') {
      this.garden = getGarden();

      this.savedToTheGroup();
      return Promise.resolve(this.group);
    } else if (label === 'Colonisation') {
      this.garden = getColonialGarden();
      this.savedToTheGroup();
      return Promise.resolve(this.group);
    }
  }
}

export default GardenFactory;
