export const multiplyObject = (object: any, x: number) => {
    return Object.fromEntries(
        Object.entries(object).map(([key, value]) =>
            Number(value) ? [key, (value as number) * x] : [key, undefined],
        ),
    );
};

export const removeNullObjectValues = (object: any): void => {
    Object.keys(object).forEach((k) => object[k] == null && delete object[k]);
};
