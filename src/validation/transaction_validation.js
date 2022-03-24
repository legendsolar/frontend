export const validateTransferAmount = (inputString) => {
    try {
        const float = parseFloat(inputString);

        if (float < 0) {
            return {
                value: "0",
                error: true,
                errMsg: "Transaction amount must positive",
            };
        }

        // returns a string
        return {
            value: float.toFixed(2),
            error: false,
            errMsg: null,
        };
    } catch {
        return {
            value: inputString,
            error: true,
            errMsg: "Transaction amount must be a number",
        };
    }
};
