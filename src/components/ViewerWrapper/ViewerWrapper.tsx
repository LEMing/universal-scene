import React, {useCallback, useMemo, useState} from 'react';
import runGalaxyAnimation from '../../models/Galaxy/getGalaxyAnimation';
import Planet from '../../models/Galaxy/Planet';
import ModelFactory from '../../models/ModelFactory';
import StarsFactory from '../../models/Galaxy/StarsFactory';
import {Viewer, DEFAULT_VIEWER_OPTIONS} from 'tiny-viewer';
import * as THREE from 'three';
import Checkbox from './components/Checkbox';
import NumberInput from './components/NumberInput';
import Selector from './components/Selector';
import {SELECTOR_CONFIG} from './config';
import ColorInput from './components/ColorInput';
import './ViewerWrapper.scss';

const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [label, setLabel] = useState(SELECTOR_CONFIG[0].label);
  const [options, setOptions] = useState(DEFAULT_VIEWER_OPTIONS);
  const [controller, setController] = useState<Planet[]>();

  const object3D: Promise<THREE.Object3D> | undefined = useMemo(() => {
    const factory = new ModelFactory().getCurrentFactory(label);
    if (factory instanceof StarsFactory) {
      setController(factory.galaxy)
    }
    return factory?.getModelByLabel(label);
  }, [label]);

  const animationRunner = useCallback(() => {
    if (label === 'Galaxy' && scene && controller) {
      runGalaxyAnimation(scene, controller);
    }
  }, [scene, label, controller]);

  const handleSelect = useCallback((event) => {
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
    </div>
  )

}

export default ViewerWrapper;
