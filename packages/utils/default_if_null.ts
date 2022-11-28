/**
 * @param val value to check
 * @param defaultValue default value
 * @returns
 */
export const defaultIfNull = (val: null | any, defaultValue: any): any => {
    return !!val ? val : defaultValue;
};
