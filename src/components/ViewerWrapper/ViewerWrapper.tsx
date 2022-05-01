import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../TinyViewer';
import * as THREE from 'three';
import {loadGLB, createCube} from '../utils';

import './ViewerWrapper.scss';

const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const object3D = useMemo(async () => {
    const group = new THREE.Group();
    try {
      const car = await loadGLB('./data/free_datsun_280z/scene.gltf');
      car.name = 'object-name';
      group.add(car);
    } catch (error) {
      group.add(createCube({name: 'object-name'}));
    }
    return group;
  }, []);

  const animationRunner = useCallback(() => {
    if (scene) {
      const object = scene.getObjectByName('object-name');
      if (object) {
        object.rotateX(0.01);
        object.rotateY(0.01);
        object.rotateZ(0.01);
      }
    }
  }, [scene]);

  return <div className="viewer-wrapper-container">
    <Viewer animationRunner={animationRunner} dispatchers={{setScene}} object3D={object3D}/>
  </div>
}

export default ViewerWrapper;
