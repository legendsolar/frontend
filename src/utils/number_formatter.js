export const numberFormatter = (number, width = 2) => {
    if (Math.abs(number) <= 0.0001) return '0';

    const numWidth = Math.floor(Math.log10(number)) + 1;

    const decimal = width - numWidth > 0 ? width - numWidth : 0;

    return number.toFixed(decimal);
};
