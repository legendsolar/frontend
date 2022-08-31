import settings from 'app_settings';
import {useEffect, useState, useRef, useLayoutEffect} from 'react';

const LoadingText = () => {
    const states = ['Loading', 'Loading.', 'Loading..', 'Loading...'];

    const [stateIdx, setStateIdx] = useState<number>(0);
    const [width, setWidth] = useState<number>();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (stateIdx === 0) {
            setWidth(ref.current?.offsetWidth);
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (stateIdx >= states.length - 1) {
                setStateIdx(0);
            } else {
                setStateIdx(stateIdx + 1);
            }
        }, settings.loadingAnimationTiming_ms);

        return () => clearTimeout(timer);
    }, [stateIdx]);

    return (
        <div ref={ref} style={{width: width ? width + 'px' : 'auto'}}>
            {states[stateIdx]}
        </div>
    );
};

export default LoadingText;
