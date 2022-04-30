import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export interface UniversalHookProps {
  builder: () => EnvObject,
}

export interface SceneProps {
  background?: number,
  fog?: number,
}

export interface ControlsProps {
  camera: THREE.Camera,
  renderer: THREE.Renderer,
}

export interface LightProps {
  intensity?: number,
  skyColor?: number,
  groundColor?: number,
}

export type EnvObject = THREE.Camera | THREE.Scene | THREE.Renderer | OrbitControls;
