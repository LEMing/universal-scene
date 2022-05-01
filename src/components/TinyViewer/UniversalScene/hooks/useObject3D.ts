import {useEffect, useState} from 'react';
import * as THREE from 'three';

const useObject3D = (scene: THREE.Scene, object3D?: Promise<THREE.Object3D> | THREE.Object3D) => {
  const [isObjectAdded, setIsObjectAdded] = useState(false);
  useEffect(function loadObject3D() {
    if (object3D) {
      Promise.resolve(object3D)
      .then((data) => {
        scene.add(data);
        setIsObjectAdded(true);
      })
      .catch((error: ErrorEvent) => {
        console.error(error.message);
        setIsObjectAdded(false);
      })
    }
  }, [scene, object3D])
  return {isObjectAdded};
}

export default useObject3D;
