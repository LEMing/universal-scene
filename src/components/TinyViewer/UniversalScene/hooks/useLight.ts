import {useEffect} from 'react';
import {createLight} from '../../environment';
import * as THREE from 'three';

const useLight = (scene: THREE.Scene, addDefaultLight: boolean) => {
  useEffect(function addLight() {
    if (addDefaultLight) {
      const lights = createLight();
      lights.forEach(light => scene.add(light));
    }
  }, [scene, addDefaultLight]);
}

export default useLight;
