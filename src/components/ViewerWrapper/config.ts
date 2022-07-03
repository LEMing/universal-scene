
import {SelectorRow} from './types';

const DATA_FOLDER = './data/';
const DEFAULT_SCENE_NAME = 'scene.gltf';

const getModelPath = (name: string) => {
  return `${DATA_FOLDER}${name}/${DEFAULT_SCENE_NAME}`;
}

export const CAR_MODELS: SelectorRow[] = [
  {value: getModelPath('free_datsun_280z'), label: 'Datsun'},
  {value: getModelPath('xyz_school_coursework_highpoly_porsche_singer'), label: 'Porsche'},
  {value: getModelPath('truck_f-100'), label: 'Truck'},
]