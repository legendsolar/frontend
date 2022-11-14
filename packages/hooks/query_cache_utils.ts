interface CachedQuery {
    query: any;
    inputs: any;
    queryName: string;
}

export const constructQueryCacheKey = (cachedQuery: CachedQuery): string => {
    return JSON.stringify(cachedQuery);
};

export const deconstructQueryCacheKey = (key: string): CachedQuery => {
    return JSON.parse(key);
};
