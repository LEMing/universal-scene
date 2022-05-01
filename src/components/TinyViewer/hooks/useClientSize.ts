import {useCallback, useEffect, useRef, useState} from 'react';

const useClientSize = () => {
  const mountingPoint = useRef<HTMLDivElement>(null);
  const rootNode = mountingPoint.current;
  const [height, setHeight] = useState<number>(1);
  const [width, setWidth] = useState<number>(1);

  const [isMounted, setIsMounted] = useState(false);

  const handleResize = useCallback(() => {
    if (rootNode) {
      setWidth(rootNode.offsetWidth);
      setHeight(rootNode.offsetHeight);
    }
  }, [rootNode]);

  useEffect(function onMountingPointReady() {
    if (mountingPoint.current) {
      setIsMounted(true);
    }
  }, [mountingPoint]);

  useEffect(function runSizeObserver() {
    const observer = new ResizeObserver(handleResize);
    if (isMounted && rootNode) {
      observer.observe(rootNode);
    }
    return () => observer.disconnect();
  }, [rootNode, handleResize, isMounted]);

  return {clientSize: {clientHeight: height, clientWidth: width}, mountingPoint};
}

export default useClientSize;
