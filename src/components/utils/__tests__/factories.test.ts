import {createCube} from '../factories';

describe('Factories utils', function () {
  test('Should create a cube 3d object', () => {
    const cube = createCube({name: 'test-cube'});
    expect(cube.name).toEqual('test-cube');
  })
});
