import classNames from 'classnames';
import React, {useMemo, useState} from 'react';
import Preloader from './components/Preloader';
import {useClasses, useClientSize} from './hooks';
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

  const {clientSize, mountingPoint, threeRoot} = useClientSize();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useClasses(className);

  const content = useMemo(() => {
    const isMounted = clientSize.clientWidth > 1;
    return isMounted? <UniversalScene/> : <Preloader msg='Loading...'/>
  }, [clientSize]);

  const threeRootClassnames = classNames({
    'three-root': true,
    'loading': isLoading,
  });

  return (
    <ViewerContext.Provider value={{
      animationRunner,
      clientSize,
      dispatchers,
      object3D,
      onSceneReady,
      options,
      setIsLoading,
      threeRoot,
    }}>
      <div className={classes}>
        {content}
        <div data-testid='three-root' className={threeRootClassnames} id="three-root" ref={mountingPoint} />
      </div>
    </ViewerContext.Provider>
  );
};

export default Viewer;
