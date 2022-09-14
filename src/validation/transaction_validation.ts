export const validateTransferAmount = (
    inputString: string | null | undefined,
    maxAmount: number,
) => {
    if (!inputString) {
        return {
            value: '0',
            error: true,
            errMsg: 'Transaction amount must positive',
        };
    }

    try {
        const float = parseFloat(inputString);

        if (float < 0) {
            return {
                value: '0',
                error: true,
                errMsg: 'Transaction amount must positive',
            };
        }

        if (float > maxAmount) {
            return {
                value: maxAmount.toFixed(2),
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
