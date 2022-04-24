import {useEffect} from 'react';
import * as THREE from 'three';

const useObject3D = (scene: THREE.Scene, object3D?: THREE.Object3D) => {
  useEffect(function loadObject3D() {
    if (object3D) {
      scene.add(object3D);
    }
  }, [scene, object3D])
}

export default useObject3D;
