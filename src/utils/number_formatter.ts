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
export const integerWidth = (number: number): number => {
    if (Math.abs(number) > 1) {
        return defaultFormatter.format(number).length;
    } else {
        return 1;
    }
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
    width: number = 1,
    sciNotation: boolean = false,
) => {
    if (Math.abs(number) <= 0.0001) return '0';

    const intWidth = integerWidth(number);

    const remainingForDecimal =
        width - intWidth - 1 > 0 ? width - intWidth - 1 : 0;

    if (sciNotation && intWidth > width) {
        return compactFormatter.format(number);
    }

    console.log({number, remainingForDecimal, intWidth, width});

    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: remainingForDecimal,
        minimumFractionDigits:
            remainingForDecimal > 1 ? remainingForDecimal - 1 : 0,
    });
    return formatter.format(number);
};

export const currencyFormatter = (number: number | undefined | null) => {
    if (number == null) return '-';

    if (number < 100) {
        return currencyFormatterInt_under100.format(number);
    }

    return currencyFormatterInt_over100.format(number);
};
