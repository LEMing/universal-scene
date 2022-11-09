import Plant from './Plant';

const getGarden = () => {
  const garden: Plant[] = [];
  const plant = new Plant({height: 4});
  garden.push(plant);
  return garden;
}

export default getGarden;
