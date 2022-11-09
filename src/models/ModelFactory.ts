import CarsFactory from './CarsFactory';
import StarsFactory from './Galaxy/StarsFactory';
import GardenFactory from './Garden/GardenFactory';
import WorldFactory from './WorldFactory';
import find from 'lodash/find';

class ModelFactory extends WorldFactory {

  private factories: WorldFactory[] = [new CarsFactory(), new StarsFactory(), new GardenFactory()]
  private _currentFactory?: WorldFactory;

  selectFactory(label: string) {
    this._currentFactory = this.factories.find(factory => find(factory.dictionary, {label}));
  }

  public getCurrentFactory(label: string) {
    this.selectFactory(label);
    return this._currentFactory;
  }

  getModelByLabel(label: string) {
    this.selectFactory(label);
    if (this._currentFactory) {
      return this._currentFactory.getModelByLabel(label);
    }
  }
}

export default ModelFactory;
