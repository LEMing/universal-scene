import CarsFactory from './CarsFactory';
import StarsFactory from './StarsFactory';
import WorldFactory from './WorldFactory';
import find from 'lodash/find';

class ModelFactory extends WorldFactory {

  private factories: WorldFactory[] = [new CarsFactory(), new StarsFactory()]
  private currentFactory?: WorldFactory;

  selectFactory(label: string) {
    this.currentFactory = this.factories.find(factory => find(factory.dictionary, {label}));
  }

  getModelByLabel(label: string) {
    this.selectFactory(label);

    if (this.currentFactory) {
      return this.currentFactory.getModelByLabel(label);
    }
  }
}

export default ModelFactory;
