import {renderHook} from '@testing-library/react-hooks';
import {createScene} from '../../environment';
import {createCube} from '../../helpers';
import useObject3D from '../useObject3D';

describe('Should test useObject3D hook', () => {
  test('Should add a new object to the scene', () => {
    const scene = createScene();
    const objectName = 'My Cube';
    const myCube = createCube({name: objectName});
    renderHook(() => useObject3D(scene, myCube));
    const object3D = scene.getObjectByName(objectName);
    expect(object3D).toBeDefined();
  });

  test('Should keep the scene empty', () => {
    const scene = createScene();
    renderHook(() => useObject3D(scene));
    const countOfChildren = scene.children.length;
    expect(countOfChildren).toEqual(0);
  });

});
