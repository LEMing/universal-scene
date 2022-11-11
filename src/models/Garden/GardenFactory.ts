import {SelectorRow} from '../../components/ViewerWrapper/types';
import WorldFactory from '../WorldFactory';
import * as THREE from 'three';
import DrawableObject from './DrawableObject';
import getGarden from './getGarden';

export const GARDEN: SelectorRow[] = [
  {value: 'Garden', label: 'Garden'},
]

class GardenFactory extends WorldFactory {
  public garden: DrawableObject[];
  constructor() {
    super();
    this.dictionary = GARDEN;
    this.garden = getGarden();
  }

  getModelByLabel(label: string) {
    if (label === 'Garden') {
      const group = new THREE.Group();
      this.garden.forEach(object => {
        group.add(object.draw())
      })
      return Promise.resolve(group);
    }
  }
}

export default GardenFactory;
