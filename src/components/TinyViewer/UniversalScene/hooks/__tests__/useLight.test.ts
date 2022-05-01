import { renderHook } from '@testing-library/react'
import {createScene} from '../../../environment';
import useLight from '../useLight';

describe('Should test useLight hook', () => {
  test('Should add 2 light objects to the scene', () => {
    const scene = createScene();
    const addLight = true;
    const numberOfChildrenBefore = scene.children.length;
    renderHook(() => useLight(scene, addLight));
    expect(scene.children.length).toEqual(numberOfChildrenBefore + 2);
  });

  test('Should keep the scene without changes', () => {
    const scene = createScene();
    const addLight = false;
    const numberOfChildrenBefore = scene.children.length;
    renderHook(() => useLight(scene, addLight));
    expect(scene.children.length).toEqual(numberOfChildrenBefore);
  });

});
