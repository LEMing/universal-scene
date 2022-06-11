import {useEffect, useMemo, useState} from 'react';
import {createLight} from '../../environment';
import * as THREE from 'three';
import {UseLight} from './types';
import {ViewerOptions} from '../../types';
import {getNames, removeObjectsByName} from "./utils";

const useLight = (scene: THREE.Scene, props: ViewerOptions) => {
  const {addDefaultLight} = props;
  const [lightNamesInScene, setLightNamesInScene] = useState<string[]>([]);
  const {environment} = props;

  const lightProps: UseLight = useMemo(() => {
    return {
      addDefaultLight,
      groundColor: environment?.lightOptions.groundColor,
      skyColor: environment?.lightOptions.skyColor,
      intensity: environment?.lightOptions.lightIntensity
    }
  }, [environment, addDefaultLight]) ;

  useEffect(function updateLight() {
    if (lightProps.addDefaultLight) {
      const lights = createLight(lightProps);
      const names = getNames(lights);
      removeObjectsByName(names, scene);
      lights.forEach(light => {
        scene.add(light);
      });
      setLightNamesInScene(names);
    }
  }, [scene, lightProps]);

  useEffect(function removeLight() {
    if (!lightProps.addDefaultLight) {
      removeObjectsByName(lightNamesInScene, scene);
    }
  },[scene, lightProps, lightNamesInScene])
}

export default useLight;
