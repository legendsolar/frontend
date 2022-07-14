export const multiplyObject = (object, x) => {
    return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, value * x]),
    );
};
