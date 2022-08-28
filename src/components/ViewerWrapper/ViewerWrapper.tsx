import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../TinyViewer';
import * as THREE from 'three';
import Checkbox from './components/Checkbox';
import NumberInput from './components/NumberInput';
import Selector from './components/Selector';
import {SELECTOR_CONFIG} from './config';
import './ViewerWrapper.scss';
import {DEFAULT_VIEWER_OPTIONS} from "../TinyViewer/constants";
import ColorInput from "./components/ColorInput";
import CarsFactory from "../../models/CarsFactory";

const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [label, setLabel] = useState(SELECTOR_CONFIG[0].label);
  const [options, setOptions] = useState(DEFAULT_VIEWER_OPTIONS);

  const object3D = useMemo(async () => {
    const OPTIONS = {
      'Datsun': new CarsFactory().getDatsun(),
      'Porsche': new CarsFactory().getPorsche(),
      'Truck': new CarsFactory().getTruck(),
    }
    return OPTIONS[label];
  }, [label]);

  const animationRunner = useCallback(() => {
    if (scene) {
      const object = scene.getObjectByName('object-label');
      if (object) {
         // object.rotateY(0.001);
      }
    }
  }, [scene]);

  const handleSelect = useCallback((event) => {
    console.log(event.target.value)
    setLabel(event.target.value);
  }, [setLabel]);

  return (
    <div className="viewer-with-options">
      <div className="options">
        <div className="options-title">Options</div>
        <Selector handleSelect={handleSelect} data={SELECTOR_CONFIG}/>
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
      <div className="viewer-wrapper-container">
        <Viewer/>
      </div>
    </div>
  )

}

export default ViewerWrapper;
