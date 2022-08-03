import {useEffect, useLayoutEffect, useReducer, useRef} from 'react';

export const LINEAR_FLOW_ACTIONS = {
    ADVANCE: 'advance',
    RETURN: 'return',
};

const states = [
    {
        content: <div>1</div>,
        disabled: true,
    },
];

const useLinearFlow = ({states}) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case LINEAR_FLOW_ACTIONS.ADVANCE:
                return {count: state.count + 1};
            case LINEAR_FLOW_ACTIONS.RETURN:
                return {count: state.count - 1};
            default:
                throw new Error();
        }
    };

    const [stateIndex, dispatch] = useReducer(reducer, 0);

    return {
        state: states[stateIndex],
        dispatch,
    };
};

export default useLinearFlow;
