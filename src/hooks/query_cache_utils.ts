export const constructQueryCacheKey = (
    query: string,
    inputs: any,
    queryName: string,
): string => {
    return JSON.stringify({query, inputs, queryName});
};

export const deconstructQueryCacheKey = (key: string) => {
    return JSON.parse(key);
};
