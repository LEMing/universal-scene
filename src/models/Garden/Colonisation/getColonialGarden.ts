import DrawableObject from '../DrawableObject';
import Tree from './Tree';
import range from 'lodash/range';

const getColonialGarden = () => {
  const garden: DrawableObject[] = [];
  // const minDist: number = 0.1;
  // const maxDist: number = 10;
  const tree = new Tree();
  range(10).forEach(() => tree.grow())
  garden.push(tree);
  console.log(tree)
  return garden;
}

export default getColonialGarden;
