export const constructQueryCacheKey = (query, inputs, queryName) => {
    return JSON.stringify({query, inputs, queryName});
};

export const deconstructQueryCacheKey = (key) => {
    return JSON.parse(key);
};
