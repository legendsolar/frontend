import {ResizeObserver} from '@juggle/resize-observer';
import {useRef, useState, useEffect} from 'react';

const combineChartDimensions = (dimensions) => {
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
            parsedDimensions.height -
                parsedDimensions.marginTop -
                parsedDimensions.marginBottom,
            0,
        ),
        boundedWidth: Math.max(
            parsedDimensions.width -
                parsedDimensions.marginLeft -
                parsedDimensions.marginRight,
            0,
        ),
    };
};

export const useChartDimensions = (passedSettings) => {
    const ref = useRef<HTMLDivElement>();
    const [dimensions, setDimensions] = useState(
        combineChartDimensions({...passedSettings, width: 0, height: 0}),
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
    }, []);

    console.log({insideRef: ref});

    const newSettings = combineChartDimensions({
        ...dimensions,
    });

    return [ref, newSettings];
};
