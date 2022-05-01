import {useEffect, useState} from 'react';
import * as THREE from 'three';

type UseObject3DResolverProps = {
  object3D?: Promise<THREE.Object3D>,
}

const UseObject3DResolver = ({object3D}: UseObject3DResolverProps) => {
  const [isObject3DLoaded, setIsObject3DLoaded] = useState(false);

  useEffect(function onObject3DLoaded() {
    if (object3D) {
      Promise.resolve(object3D)
      .then(() => {
        setIsObject3DLoaded(true);
      })
      .catch(() => {
        setIsObject3DLoaded(false);
      });
    }
  }, [object3D, setIsObject3DLoaded]);
  return {isObject3DLoaded}
}

export default UseObject3DResolver;
