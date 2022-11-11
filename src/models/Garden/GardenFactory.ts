import {SelectorRow} from '../../components/ViewerWrapper/types';
import WorldFactory from '../WorldFactory';
import * as THREE from 'three';
import DrawableObject from './DrawableObject';
import getColonialGarden from './Colonisation/getColonialGarden';
import getGarden from './getGarden';

export const GARDEN: SelectorRow[] = [
  {value: 'Garden', label: 'Garden'},
  {value: 'Colonisation', label: 'Colonisation'},
]

class GardenFactory extends WorldFactory {
  public garden: DrawableObject[];
  private group: THREE.Group;
  constructor() {
    super();
    this.dictionary = GARDEN;
    this.garden = getGarden();
    this.group = new THREE.Group;
  }
  savedToTheGroup() {
    this.group = new THREE.Group;
    this.garden.forEach(object => {
      this.group.add(object.draw())
    })
  }
  getModelByLabel(label: string) {
    if (label === 'Garden') {
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
