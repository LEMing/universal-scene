import React, {useRef} from 'react';
import {DEFAULT_VIEWER_OPTIONS} from './constants';
import {
  useClasses, useClientSize,
  useDispatchers,
  useHelpers,
  useLight,
  useObject3D,
  useOnDidMount,
  useOnSceneReady,
  useThreeEnvironment,
} from './hooks';

import {ViewerProps} from './types';

import './Viewer.scss';

const Viewer = (props: ViewerProps) => {
  const {
    animationRunner,
    className = '',
    dispatchers,
    object3D,
    onSceneReady,
    options,
  } = props;

  const {addDefaultHelpers, addDefaultLight} = {...DEFAULT_VIEWER_OPTIONS, ...options};
  const mount = useRef<HTMLDivElement>(null);
  const clientSize = useClientSize(mount);
  const threeEnv = useThreeEnvironment(clientSize);
  const classes = useClasses(className);
  useDispatchers({threeEnv, dispatchers});
  useLight(threeEnv.scene, addDefaultLight);
  useHelpers(threeEnv.scene, addDefaultHelpers);
  useObject3D(threeEnv.scene, object3D);
  useOnSceneReady(onSceneReady);
  useOnDidMount({threeEnv, mount, animationRunner});

  return (
    <div className={classes}>
      <div className="three-root" id="three-root" ref={mount} />
    </div>
  );
};

export default Viewer;