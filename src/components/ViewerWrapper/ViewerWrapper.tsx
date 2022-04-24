import React, {useCallback, useMemo, useState} from 'react';
import Viewer from '../TinyViewer';
import * as THREE from 'three';
import './ViewerWrapper.scss'
const ViewerWrapper = () => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const object3D = useMemo(() => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial( { color: 0x333333 } );
    const cube = new THREE.Mesh( geometry, material);
    cube.name = 'My cube';
    return cube;
  }, []);

  const animationRunner = useCallback(() => {
    if (scene) {
      const object = scene.getObjectByName('My cube');
      if (object) {
        object.rotateX(0.01);
        object.rotateY(0.01);
        object.rotateZ(0.01);
      }
    }
  }, [scene]);

  return <div className="viewer-wrapper-container">
    <Viewer animationRunner={animationRunner} dispatchers={{setScene}} object3D={object3D}/>
  </div>
}

export default ViewerWrapper;
