import {useMemo} from 'react';
import classNames from 'classnames';

const useClasses = (className: string) => {
  return useMemo(() => classNames({
    [className]: Boolean(className),
  }), [className]);
}

export default useClasses;
