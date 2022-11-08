import {SelectorRow} from '../components/ViewerWrapper/types';
import * as THREE from 'three';

abstract class WorldFactory {
  public dictionary: SelectorRow[] | undefined;
  abstract getModelByLabel(label: string): Promise<THREE.Object3D> | undefined;
}
export default WorldFactory;
