import {useState} from 'react';

export const useLoadingText = (speed_ms): string => {
    const [textState, setTextState] = useState<string>('.');
    return textState;
};
