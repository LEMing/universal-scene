import {envHooks} from '../environment';
import {ClientAreaProps, ThreeEnvironment} from '../types';

const useThreeEnvironment = (clientSize: ClientAreaProps): ThreeEnvironment => {
  const scene = envHooks.useScene({});
  const camera = envHooks.useCamera({clientSize});
  const renderer = envHooks.useRenderer({clientSize});
  const controls = envHooks.useControls({camera, renderer});

  return {scene, camera, controls, renderer}
}

export default useThreeEnvironment;
