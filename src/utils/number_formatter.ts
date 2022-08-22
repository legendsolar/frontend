const compactFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 0,
});

const currencyFormatterInt_under100 = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const currencyFormatterInt_over100 = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

const defaultFormatter = new Intl.NumberFormat('en-US');

const minNumber = 0.00001;

/**
 * Calculates number width if output with full precision in chars, including commas and periods
 * @param number
 */
export const numberWidth = (number: number): number => {
    return defaultFormatter.format(number).length;
};

/**
 * Takes a number and formats it to a given width, and unit description, if given
 * @param {*} number
 * @param {*} width
 * @param {*} unit
 * @returns
 */
export const numberFormatter = (
    number: number,
    width: number = 2,
    sciNotation: boolean = false,
) => {
    if (Math.abs(number) <= 0.0001) return '0';

    const numWidth = numberWidth(number);

    const decimal = width - numWidth > 0 ? width - numWidth : 0;

    if (sciNotation && numWidth > width) {
        return compactFormatter.format(number);
    }

    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimal,
    });
    return formatter.format(number);
};

export const currencyFormatter = (number: number) => {
    if (number < 100) {
        return currencyFormatterInt_under100.format(number);
    }

    return currencyFormatterInt_over100.format(number);
};
