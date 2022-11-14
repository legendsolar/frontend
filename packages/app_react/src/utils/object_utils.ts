export const multiplyObject = <T>(object: T, x: number): T => {
    return mapFunction<T>(object, (val) => (Number(val) ? val * x : val));
};

export const removeNullObjectValues = (object: any): void => {
    Object.keys(object).forEach((k) => object[k] == null && delete object[k]);
};

export const defined = (value: any): boolean => {
    // todo NaN?
    if (value !== null && value !== undefined) {
        return true;
    }

    return false;
};

export const mapFunction = <T>(object: T, fn: (val: any) => any): T => {
    return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, fn(value)]),
    ) as unknown as T;
};
