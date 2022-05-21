import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../TinyViewer';
import * as THREE from 'three';
import {loadGLB, createCube} from '../utils';
import Selector from './components/Selector';
import {CAR_MODELS} from './config';
import './ViewerWrapper.scss';

const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [path, setPath] = useState(CAR_MODELS[0].value);

  const object3D = useMemo(async () => {
    const group = new THREE.Group();
    try {
      const car = await loadGLB(path);
      car.name = 'object-name';
      group.add(car);
    } catch (error) {
      group.add(createCube({name: 'object-name'}));
    }
    return group;
  }, [path]);

  const animationRunner = useCallback(() => {
    if (scene) {
      const object = scene.getObjectByName('object-name');
      if (object) {
        object.rotateY(0.001);
      }
    }
  }, [scene]);

  const handleSelect = useCallback((event) => {
    setPath(event.target.value);
  }, [])

  return (
    <>
      <Selector handleSelect={handleSelect} data={CAR_MODELS}/>
      <div className="viewer-wrapper-container">
        <Viewer animationRunner={animationRunner} dispatchers={{setScene}} object3D={object3D}/>
      </div>
    </>
  )

}

export default ViewerWrapper;
