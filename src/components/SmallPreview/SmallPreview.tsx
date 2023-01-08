import {Viewer, viewerUtils} from 'tiny-viewer';

import './SmallPreview.scss';

const modelUrl = './data/banana.glb';
const SmallPreview = () => {
  const object3D = viewerUtils.loadGLB(modelUrl)
  return <div className="small-preview-wrapper">
    <Viewer object3D={object3D}/>
  </div>
}

export default SmallPreview;
