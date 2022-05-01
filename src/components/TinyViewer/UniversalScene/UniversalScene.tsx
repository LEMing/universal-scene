import React from 'react';
import {useContext} from 'react';
import classNames from 'classnames';

import Preloader from '../components/Preloader';
import {DEFAULT_VIEWER_OPTIONS} from '../constants';
import {
  useDispatchers,
  useHelpers,
  useLight,
  useObject3D,
  useOnDidMount,
  useOnSceneReady,
  useThreeEnvironment
} from './hooks';

import './UniversalScene.scss';

import ViewerContext from '../ViewerContext';

const UniversalScene = () => {
  const {
    animationRunner,
    clientSize,
    dispatchers,
    object3D,
    onSceneReady,
    options,
    threeRoot,
  } = useContext(ViewerContext);

  const {addDefaultHelpers, addDefaultLight} = {...DEFAULT_VIEWER_OPTIONS, ...options};
  const threeEnv = useThreeEnvironment(clientSize);
  useDispatchers({threeEnv, dispatchers});
  useLight(threeEnv.scene, addDefaultLight);
  useHelpers(threeEnv.scene, addDefaultHelpers);
  const {isObjectAdded} = useObject3D(threeEnv.scene, object3D);
  useOnSceneReady(onSceneReady);
  useOnDidMount({threeEnv, threeRoot, animationRunner});
  const sceneClasses = classNames({
    'universal-scene': true,
    'fog': isObjectAdded,
  });
  return (
    <div data-testid='universal-scene' className={sceneClasses}>
      {!isObjectAdded && <Preloader msg={'Preparing scene...'}/>}
    </div>)
};

export default UniversalScene;
