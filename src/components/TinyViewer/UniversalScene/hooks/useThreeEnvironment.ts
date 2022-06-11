import {useContext} from 'react';
import {envHooks} from '../../environment';
import {ClientAreaProps, ThreeEnvironment} from '../../types';
import * as THREE from 'three';
import ViewerContext from '../../ViewerContext';

import useClientSizeUpdate from './useClientSizeUpdate';

const useThreeEnvironment = (clientSize: ClientAreaProps): ThreeEnvironment => {
  const {options} = useContext(ViewerContext);
  const {environment: {sceneOptions: {envMapUrl, sceneColor, fog}}} = options;
  const sceneProps = {
    fog,
    background: sceneColor,
    envMapUrl: envMapUrl
  };
  const scene = envHooks.useScene(sceneProps);
  const camera = envHooks.useCamera() as THREE.PerspectiveCamera;
  const renderer = envHooks.useRenderer();
  const controls = envHooks.useControls({camera, renderer});
  useClientSizeUpdate({camera, renderer, clientSize});

  return {scene, camera, controls, renderer}
}

export default useThreeEnvironment;
