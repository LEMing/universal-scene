import {ControlsProps, EnvObject, SceneProps, UniversalHookProps} from './types';
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

const useCamera = () => useUniversalHook({
  builder: () => createCamera(),
}) as THREE.Camera;

const useScene = (props: SceneProps) => useUniversalHook({
  builder: () => createScene(props),
}) as THREE.Scene;

const useRenderer =  () => useUniversalHook({
  builder: () => createRenderer(),
}) as THREE.Renderer;

const useControls = (props: ControlsProps) => useUniversalHook({
  builder: () => createControls(props),
}) as OrbitControls;

export const envHooks = {
  useCamera,
  useScene,
  useRenderer,
  useControls,
}
