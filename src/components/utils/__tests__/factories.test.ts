import {createBox} from '../builders';

describe('Builder utils', function () {
  test('Should create a cube 3d object', () => {
    const cube = createBox({name: 'test-cube'});
    expect(cube.name).toEqual('test-cube');
  })
});
