import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../Viewer';
import * as THREE from 'three';

const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const object3D = useMemo(() => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
    const cube = new THREE.Mesh( geometry, material);
    cube.name = 'My cube';
    return cube;
  }, []);

  const animationRunner = useCallback(() => {
    if (scene) {
      const object = scene.getObjectByName('My cube');
      if (object) {
        object.rotateX(0.01);
        object.rotateY(0.01);
        object.rotateZ(0.01);
      }
    }
  }, [scene]);

  return <Viewer animationRunner={animationRunner} dispatchers={{setScene}} object3D={object3D}/>
}

export default ViewerWrapper;
