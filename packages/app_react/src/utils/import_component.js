import {lazy} from 'react';

export const lazyImport = (path) =>
    lazy(() =>
        import(`${path}`).catch((e) => {
            return import(`../views/error`);
        }),
    );
