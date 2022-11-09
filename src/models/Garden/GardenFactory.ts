import {SelectorRow} from '../../components/ViewerWrapper/types';
import WorldFactory from '../WorldFactory';
import * as THREE from 'three';
import getGarden from './getGarden';
import Plant from './Plant';

export const GARDEN: SelectorRow[] = [
  {value: 'Garden', label: 'Garden'},
]

class GardenFactory extends WorldFactory {
  public garden: Plant[];
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
