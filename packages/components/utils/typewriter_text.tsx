import {useEffect, useState, useRef, useLayoutEffect} from 'react';

export interface TypewriterTextProps {
    prefix?: string;
    loadingAnimationTiming_ms?: number;
}

export const TypewriterText = ({
    prefix = '',
    loadingAnimationTiming_ms = 50,
}: TypewriterTextProps) => {
    const states = ['', '.', '..', '...'];

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
        }, loadingAnimationTiming_ms);

        return () => clearTimeout(timer);
    }, [stateIdx]);

    return (
        <div ref={ref} style={{width: width ? width + 'px' : 'auto'}}>
            {prefix + states[stateIdx]}
        </div>
    );
};
