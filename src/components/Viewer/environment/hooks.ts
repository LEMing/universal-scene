import {CameraProps, RendererProps, ControlsProps, EnvObject, SceneProps, UniversalHookProps} from './types';
import {useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {createCamera, createControls, createRenderer, createScene} from './environment';

const useUniversalHook = ({builder}: UniversalHookProps) => {
  const [state, setState] = useState<EnvObject>();
  if (!state) {
    const envObject = builder();
    setState(envObject);
    return envObject;
  }
  return state;
};

export const envHooks = {
  useCamera: (props: CameraProps) => useUniversalHook({
    builder: () => createCamera(props),
  }) as THREE.Camera,

  useScene: (props: SceneProps) => useUniversalHook({
    builder: () => createScene(props),
  }) as THREE.Scene,

  useRenderer: (props: RendererProps) => useUniversalHook({
    builder: () => createRenderer(props),
  }) as THREE.Renderer,

  useControls: (props: ControlsProps) => useUniversalHook({
    builder: () => createControls(props),
  }) as OrbitControls,
};
