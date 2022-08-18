const compactFormatter = new Intl.NumberFormat('en-US', {notation: 'compact'});
const currencyFormatterInt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const formatter = new Intl.NumberFormat('en-US');

/**
 * Takes a number and formats it to a given width, and unit description, if given
 * @param {*} number
 * @param {*} width
 * @param {*} unit
 * @returns
 */
export const numberFormatter = (number, width = 2, unit = null) => {
    if (Math.abs(number) <= 0.0001) return '0';

    const numWidth = number > 1 ? Math.floor(Math.log10(number)) + 1 : 1;

    const decimal = width - numWidth > 0 ? width - numWidth : 0;

    if (!unit || numWidth < width) {
        const numString =
            number >= 1000 ? formatter.format(number) : number.toFixed(decimal);
        // sometimes number will be too wide if too large
        if (unit) {
            return numString + unit;
        } else {
            return numString;
        }
    }

    return compactFormatter.format(number) + unit;
};

export const currencyFormatter = (number, unit = '$') => {
    return currencyFormatterInt.format(number);
};
