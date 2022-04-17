import {useEffect} from 'react';
import {envHooks} from '../environment';
import {ClientAreaProps, ThreeEnvironment} from '../types';
import * as THREE from 'three';

const useThreeEnvironment = (clientSize: ClientAreaProps): ThreeEnvironment => {
  const scene = envHooks.useScene({});
  const camera = envHooks.useCamera() as THREE.PerspectiveCamera;
  const renderer = envHooks.useRenderer();
  const controls = envHooks.useControls({camera, renderer});

  useEffect(function onClientSizeUpdate() {
    const {clientWidth, clientHeight} = clientSize;
    if (clientWidth && clientHeight) {
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }
  }, [clientSize, camera, renderer])

  return {scene, camera, controls, renderer}
}

export default useThreeEnvironment;
