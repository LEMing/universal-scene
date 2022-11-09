import LSystem from './LSystem';
import Plant from './Plant';

const getGarden = () => {
  const garden: Plant[] = [];
  const plants = new LSystem().getPlants();
  garden.push(...plants);
  return garden;
}

export default getGarden;
