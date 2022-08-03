import {useEffect, useLayoutEffect, useReducer, useRef} from 'react';

const LINEAR_FLOW_ACTIONS = {
    ADVANCE: 'advance',
    BACK: 'back',
};

const states = [
    {
        content: <div>1</div>,
        disabled: true,
    },
];

const useLinearFlow = ({states}) => {
    const reducer = (state, action) => {
        switch (action) {
            case LINEAR_FLOW_ACTIONS.ADVANCE:
                for (var i = state; i < states.length; i++) {
                    if (!state.disabled) {
                        return i;
                    }
                }
                throw new Error('No state enabled');
            case LINEAR_FLOW_ACTIONS.BACK:
                for (var i = state; i >= 0; i--) {
                    if (!state.disabled) {
                        return i;
                    }
                }
                throw new Error('No state enabled');
            default:
                throw new Error();
        }
    };

    const [stateIndex, dispatch] = useReducer(reducer, 0);

    const advance = () => {
        dispatch(LINEAR_FLOW_ACTIONS.ADVANCE);
    };

    const back = () => {
        dispatch(LINEAR_FLOW_ACTIONS.BACK);
    };

    return {
        state: states[stateIndex],
        advance,
        back,
    };
};

export default useLinearFlow;
