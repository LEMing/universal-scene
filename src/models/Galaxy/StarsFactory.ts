import {SelectorRow} from '../../components/ViewerWrapper/types';
import getGalaxy from './getGalaxy';
import Planet from './Planet';
import WorldFactory from '../WorldFactory';
import * as THREE from 'three';

export const STARS: SelectorRow[] = [
  {value: 'Galaxy', label: 'Galaxy'},
]

class StarsFactory extends WorldFactory {
  public galaxy: Planet[];
  constructor() {
    super();
    this.dictionary = STARS;
    this.galaxy = getGalaxy();
  }

  getModelByLabel(label: string) {
    if (label === 'Galaxy') {
      const group = new THREE.Group();
      this.galaxy.forEach(planet => {
        group.add(planet.draw())
      })
      return Promise.resolve(group);
    }
  }
}

export default StarsFactory;
