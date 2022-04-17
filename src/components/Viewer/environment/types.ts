import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ClientAreaProps} from '../types';

export interface UniversalHookProps {
  builder: () => EnvObject,
}

export interface CameraProps {
  clientSize: ClientAreaProps,
}

export interface RendererProps {
  clientSize: ClientAreaProps,
}

export interface SceneProps {
  color?: number,
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
