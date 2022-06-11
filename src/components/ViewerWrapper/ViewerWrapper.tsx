import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../TinyViewer';
import * as THREE from 'three';
import {createBox, loadGLB} from '../utils';
import Checkbox from './components/Checkbox';
import NumberInput from './components/NumberInput';
import Selector from './components/Selector';
import {CAR_MODELS} from './config';
import './ViewerWrapper.scss';
import {DEFAULT_VIEWER_OPTIONS} from "../TinyViewer/constants";
import ColorInput from "./components/ColorInput";

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
        <Checkbox onUpdate={setOptions} data={options} path={'addDefaultHelpers'} label="Default helper:"/>
        <Checkbox onUpdate={setOptions} data={options} path={'addDefaultLight'} label="Default light:"/>
        <div className="options-subtitle">Light options</div>
        <ColorInput onUpdate={setOptions} data={options} path={'environment.lightOptions.skyColor'} label="Sky Color:"/>
        <ColorInput onUpdate={setOptions} data={options} path={'environment.lightOptions.groundColor'} label="Ground Color:"/>
        <NumberInput
            onUpdate={setOptions}
            data={options}
            path={'environment.lightOptions.lightIntensity'}
            label="Light intensity:"
            numberProps={{min: 0, max: 1, step: 0.1}}
        />
        <div className="options-subtitle">Scene options</div>
        <ColorInput onUpdate={setOptions} data={options} path={'environment.sceneOptions.fog.color'} label="Fog Color:"/>
        <NumberInput
            onUpdate={setOptions}
            data={options}
            path={'environment.sceneOptions.fog.far'}
            label="Fog far:"
            numberProps={{min: 0, max: 100000, step: 10}}
        />
        <NumberInput
            onUpdate={setOptions}
            data={options}
            path={'environment.sceneOptions.fog.near'}
            label="Fog near:"
            numberProps={{min: 0, max: 100000, step: 10}}
        />
        <ColorInput onUpdate={setOptions} data={options} path={'environment.sceneOptions.sceneColor'} label="Scene Color:"/>
      </div>
      <div className="viewer-wrapper-container">
        <Viewer animationRunner={animationRunner} dispatchers={{setScene}} object3D={object3D} options={options}/>
      </div>
    </div>
  )

}

export default ViewerWrapper;
