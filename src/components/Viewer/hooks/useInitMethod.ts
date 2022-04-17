import {RefObject, useCallback} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

type UseInitMethod = {
  mount: RefObject<HTMLDivElement>,
  renderer: THREE.Renderer,
  controls: OrbitControls;
}
const useInitMethod = ({mount, renderer, controls}: UseInitMethod) => {
  return useCallback(() => {
    if (mount.current) {
      mount.current?.appendChild(renderer.domElement);
      controls.update();
    }
  }, [controls, renderer.domElement, mount]);
}

export default useInitMethod;
