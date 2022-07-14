export const validateTransferAmount = (inputString) => {
    const maxTransferAmount = 2000;
    try {
        const float = parseFloat(inputString);

        if (float < 0) {
            return {
                value: '0',
                error: true,
                errMsg: 'Transaction amount must positive',
            };
        }

        if (float > 2000) {
            return {
                value: '2000',
                error: true,
                errMsg: 'Transaction amount must positive',
            };
        }

        return {
            value: float.toFixed(2),
            error: false,
            errMsg: null,
        };
    } catch {
        return {
            value: inputString,
            error: true,
            errMsg: 'Transaction amount must be a number',
        };
    }
};
