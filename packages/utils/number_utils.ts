export const clamp = (min: number, max: number, num: number): number =>
    Math.min(Math.max(num, min), max);

const ones = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
];

export const numberToWords = (num: number): string => {
    if (num > 10) return num.toString();

    return ones[num];
};
