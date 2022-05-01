import React, {useMemo} from 'react';
import Preloader from './components/Preloader';
import {useClasses, useClientSize} from './hooks';
import useObject3DResolver from './hooks/useObject3DResolver';
import {ViewerProps} from './types';
import UniversalScene from './UniversalScene';
import ViewerContext from './ViewerContext';
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

  const {clientSize, mountingPoint} = useClientSize();
  const classes = useClasses(className);
  const {isObject3DLoaded} = useObject3DResolver({object3D});

  const content = useMemo(() => {
    const isMounted = clientSize.clientWidth > 1;
    const isEverythingReady = isMounted && isObject3DLoaded;
    return isEverythingReady? <UniversalScene/> : <Preloader msg='Loading...'/>
  }, [clientSize, isObject3DLoaded]);

  return (
    <ViewerContext.Provider value={{
      animationRunner,
      clientSize,
      dispatchers,
      object3D,
      onSceneReady,
      options,
      threeRoot: mountingPoint.current,
    }}>
      <div className={classes}>
        {content}
        <div data-testid='three-root' className="three-root" id="three-root" ref={mountingPoint} />
      </div>
    </ViewerContext.Provider>
  );
};

export default Viewer;
