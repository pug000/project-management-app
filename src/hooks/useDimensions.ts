import { useRef, useEffect, MutableRefObject } from 'react';

const useDimensions = <T extends HTMLElement>(ref: MutableRefObject<T | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, []);

  return dimensions.current;
};

export default useDimensions;
