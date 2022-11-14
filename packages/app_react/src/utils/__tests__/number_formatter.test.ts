import {
    currencyFormatter,
    numberFormatter,
    integerWidth,
} from '@p/utils/number_formatter';

test('properly calculates number width in chars', () => {
    expect(integerWidth(0.001)).toBe(1);
    expect(integerWidth(0.555)).toBe(1);
    expect(integerWidth(0.55555)).toBe(1);
    expect(integerWidth(1)).toBe(1);
    expect(integerWidth(1.0)).toBe(1);
    expect(integerWidth(100)).toBe(3);
    expect(integerWidth(100.001)).toBe(7);
    expect(integerWidth(100.99)).toBe(6);
    expect(integerWidth(1000.99)).toBe(8);
    expect(integerWidth(1e6)).toBe(9);
});

test('formats numbers without sci notation', () => {
    expect(numberFormatter(0.9)).toBe('1');
    expect(numberFormatter(1)).toBe('1');
    expect(numberFormatter(100)).toBe('100');
    expect(numberFormatter(100.001)).toBe('100');
    expect(numberFormatter(100.99)).toBe('101');
    expect(numberFormatter(1000.99)).toBe('1,001');

    expect(numberFormatter(0.55555)).toBe('1');
    expect(numberFormatter(0.55555, 3)).toBe('0.6');
    expect(numberFormatter(0.55555, 4)).toBe('0.56');
    expect(numberFormatter(0.55555, 5)).toBe('0.556');
});

test('formats numbers with sci notation', () => {
    expect(numberFormatter(0.00000000000001, 2, true)).toBe('0');
    expect(numberFormatter(0.9, 2, true)).toBe('1');
    expect(numberFormatter(1, 2, true)).toBe('1');
    expect(numberFormatter(1000, 2, true)).toBe('1K');
    expect(numberFormatter(1e6, 2, true)).toBe('1M');
    expect(numberFormatter(1e9, 2, true)).toBe('1B');
});

test('formats currency', () => {
    expect(currencyFormatter(0.009)).toBe('$0.01');
    expect(currencyFormatter(1)).toBe('$1.00');
    expect(currencyFormatter(10)).toBe('$10.00');
    expect(currencyFormatter(100)).toBe('$100');
    expect(currencyFormatter(1000)).toBe('$1,000');
});
