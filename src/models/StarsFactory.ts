import {SelectorRow} from '../components/ViewerWrapper/types';
import getGalaxy from './Galaxy/getGalaxy';
import WorldFactory from './WorldFactory';

export const STARS: SelectorRow[] = [
  {value: 'Galaxy', label: 'Galaxy'},
]
class StarsFactory extends WorldFactory {
  constructor() {
    super();
    this.dictionary = STARS;
  }

  getModelByLabel(_label: string) {
    return Promise.resolve(getGalaxy());
  }
}

export default StarsFactory;
