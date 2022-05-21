import {envHooks} from '../../environment';
import {ClientAreaProps, ThreeEnvironment} from '../../types';
import * as THREE from 'three';

import useClientSizeUpdate from './useClientSizeUpdate';

const useThreeEnvironment = (clientSize: ClientAreaProps): ThreeEnvironment => {
  const scene = envHooks.useScene({});
  const camera = envHooks.useCamera() as THREE.PerspectiveCamera;
  const renderer = envHooks.useRenderer();
  const controls = envHooks.useControls({camera, renderer});
  useClientSizeUpdate({camera, renderer, clientSize});

  return {scene, camera, controls, renderer}
}

export default useThreeEnvironment;
