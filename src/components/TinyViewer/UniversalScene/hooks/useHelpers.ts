import {useEffect} from 'react';
import {createGridHelper, createOrdHelper} from '../../helpers';
import * as THREE from 'three';

const useHelpers = (scene: THREE.Scene, addHelpers: boolean) => {
  useEffect(function loadHelpers() {
    if (addHelpers) {
      const helper = createGridHelper({divisions:50, size: 50});
      const ordHelper = createOrdHelper();
      scene.add(ordHelper);
      scene.add(helper);
    }
  }, [addHelpers, scene]);
}

export default useHelpers;
