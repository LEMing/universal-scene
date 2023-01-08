import {viewerUtils} from 'tiny-viewer';
const {createBoxOrSphere} = viewerUtils;
describe('Builder utils', function () {
  test('Should create a cube 3d object', () => {
    const cube = createBoxOrSphere({name: 'test-cube'});
    expect(cube.name).toEqual('test-cube');
  })
});
