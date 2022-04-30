import { renderHook } from '@testing-library/react-hooks'
import {createScene} from '../../environment';
import useHelpers from '../useHelpers';

describe('Should test useHelpers hook', () => {
  test('Should add 2 helper objects to the scene', () => {
    const scene = createScene();
    const addHelpers = true;
    const numberOfChildrenBefore = scene.children.length;
    renderHook(() => useHelpers(scene, addHelpers));
    const numberOfChildrenAfter = scene.children.length;
    expect(numberOfChildrenAfter).toEqual(numberOfChildrenBefore + 2);
  });

  test('Should keep the scene without any helpers', () => {
    const scene = createScene();
    const addHelpers = false;
    const numberOfChildrenBefore = scene.children.length;
    renderHook(() => useHelpers(scene, addHelpers));
    const numberOfChildrenAfter = scene.children.length;
    expect(numberOfChildrenAfter).toEqual(numberOfChildrenBefore);
  })
})
