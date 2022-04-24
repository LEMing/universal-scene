import {RefObject, useCallback, useEffect, useState} from 'react';

const useClientSize = (mount: RefObject<HTMLDivElement>) => {
  const rootNode = mount.current;
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);

  const handleResize = useCallback(() => {
    if (rootNode) {
      setWidth(rootNode.offsetWidth);
      setHeight(rootNode.offsetHeight);
    }
  }, [rootNode]);

  useEffect(function runSizeObserver() {
    const observer = new ResizeObserver(handleResize);
    if (rootNode) {
      observer.observe(rootNode);
    }
    return () => {
      observer.disconnect();
    };
  }, [rootNode, handleResize]);

  return {clientHeight: height, clientWidth: width};
}

export default useClientSize;
