import {useEffect, useState} from 'react';
import * as THREE from 'three';
import {removeObjectByUUID} from '../utils';

const useObject3D = (scene: THREE.Scene, object3D?: Promise<THREE.Object3D> | THREE.Object3D) => {
  const [isObjectAdded, setIsObjectAdded] = useState(false);
  const [object3DID, setObject3DID] = useState<string | null>(null);

  useEffect(function loadObject3D() {
    if (object3D) {
      setIsObjectAdded(false);
      Promise.resolve(object3D)
      .then((data) => {
        if (object3DID !== data.uuid) {
          removeObjectByUUID(scene, object3DID);
          scene.add(data);
          setObject3DID(data.uuid);
        }
        setIsObjectAdded(true);
      })
      .catch((error: ErrorEvent) => {
        console.error(error.message);
        setIsObjectAdded(false);
        setObject3DID(null);
      })
    }
  }, [scene, object3D, object3DID])
  return {isObjectAdded};
}

export default useObject3D;
