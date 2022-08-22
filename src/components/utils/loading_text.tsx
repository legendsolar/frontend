import settings from 'app_settings';
import {useEffect, useState} from 'react';

const LoadingText = () => {
    const states = ['Loading', 'Loading.', 'Loading..', 'Loading...'];

    const [stateIdx, setStateIdx] = useState<number>(0);

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

    return <div>{states[stateIdx]}</div>;
};

export default LoadingText;
