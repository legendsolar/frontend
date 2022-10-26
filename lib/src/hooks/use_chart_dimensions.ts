import { ResizeObserver } from '@juggle/resize-observer';
import { useRef, useState, useEffect } from 'react';

interface Dimentions {
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  marginLeft: number;
}

interface BoundedDimentions {
  width: number;
  boundedWidth: number;
  height: number;
  boundedHeight: number;
  marginTop: number;
  marginBottom: number;
  marginRight: number;
  marginLeft: number;
}

const combineChartDimensions = (dimensions: Dimentions): BoundedDimentions => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop || 10,
    marginRight: dimensions.marginRight || 0,
    marginBottom: dimensions.marginBottom || 40,
    marginLeft: dimensions.marginLeft || 0,
  };
  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height
        ? parsedDimensions.height
        : 0 - parsedDimensions.marginTop - parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width
        ? parsedDimensions.width
        : 0 - parsedDimensions.marginLeft - parsedDimensions.marginRight,
      0
    ),
  };
};

export const useChartDimensions = (passedSettings: any) => {
  const ref = useRef<HTMLElement>();
  const [dimensions, setDimensions] = useState(
    combineChartDimensions({ ...passedSettings, width: 0, height: 0 })
  );

  useEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLDivElement;

      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) return;
        if (!entries.length) return;

        const entry = entries[0];

        if (
          dimensions.width != entry.contentRect.width ||
          dimensions.height != entry.contentRect.height
        ) {
          const newSettings = combineChartDimensions({
            ...dimensions,
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });

          setDimensions(newSettings);
        }
      });
      resizeObserver.observe(element);

      setDimensions({
        ...dimensions,
        width: element.clientWidth,
        height: element.clientHeight,
      });

      return () => resizeObserver.unobserve(element);
    }

    return () => {};
  }, []);

  const newSettings = combineChartDimensions({
    ...dimensions,
  });

  return { ref, dms: newSettings };
};
