import {Dispatch} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export interface ViewerDispatchers {
  setCamera?: Dispatch<THREE.Camera>;
  setControls?: Dispatch<OrbitControls>;
  setRenderer?: Dispatch<THREE.Renderer>;
  setScene?: Dispatch<THREE.Scene>;
}

export interface ViewerProps {
  animationRunner?: () => void;
  className?: string,
  dispatchers?: ViewerDispatchers,
  object3D?: THREE.Object3D,
  onSceneReady?: () => void,
  options?: {
    addDefaultHelpers?: boolean,
    addDefaultLight?: boolean,
  }
}

export interface ClientAreaProps {
  clientHeight?: number,
  clientWidth?: number,
}

export interface ThreeEnvironment {
  scene: THREE.Scene,
  controls: OrbitControls,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
}
