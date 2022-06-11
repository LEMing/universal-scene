import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../TinyViewer';
import * as THREE from 'three';
import {createBox, loadGLB} from '../utils';
import Checkbox from './components/Checkbox';
import Selector from './components/Selector';
import {CAR_MODELS} from './config';
import './ViewerWrapper.scss';
import {DEFAULT_VIEWER_OPTIONS} from "../TinyViewer/constants";

const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [path, setPath] = useState(CAR_MODELS[0].value);
  const [options, setOptions] = useState(DEFAULT_VIEWER_OPTIONS);

  const object3D = useMemo(async () => {
    const group = new THREE.Group();
    try {
      const car = await loadGLB(path);
      car.name = 'object-label';
      group.add(car);
    } catch (error) {
      group.add(createBox({name: 'object-name'}));
    }
    return group;
  }, [path]);

  const animationRunner = useCallback(() => {
    if (scene) {
      const object = scene.getObjectByName('object-label');
      if (object) {
         // object.rotateY(0.001);
      }
    }
  }, [scene]);

  const handleSelect = useCallback((event) => {
    setPath(event.target.value);
  }, []);

  return (
    <div className="viewer-with-options">
      <div className="options">
        <div className="options-title">Options</div>
        <Selector handleSelect={handleSelect} data={CAR_MODELS}/>
        <Checkbox onUpdate={setOptions} data={options} path={'addDefaultHelpers'} label="Default helper"/>
        <Checkbox onUpdate={setOptions} data={options} path={'addDefaultLight'} label="Default light"/>
      </div>
      <div className="viewer-wrapper-container">
        <Viewer animationRunner={animationRunner} dispatchers={{setScene}} object3D={object3D} options={options}/>
      </div>
    </div>
  )

}

export default ViewerWrapper;
