import React, {useState, useEffect, useContext, createContext} from 'react';
import {
    constructQueryCacheKey,
    deconstructQueryCacheKey,
} from './query_cache_utils';
import {format} from 'date-fns';
import {transferTransformer} from 'components/transfers/transfer_transforms';
import {useQuery, gql, useMutation} from '@apollo/client';

const transferContext = createContext();

export const ProvideTransfer = ({children}) => {
    const transfer = useProvideTransfer();
    return (
        <transferContext.Provider value={transfer}>
            {children}
        </transferContext.Provider>
    );
};

export const useTransfer = () => {
    return useContext(transferContext);
};

export const useProvideTransfer = () => {
    const TRANSFERS_BY_TYPE_QUERY = gql`
        query Query($type: TransferType!, $limit: Int!, $offset: Int) {
            userTransfersByType(type: $type, limit: $limit, offset: $offset) {
                id
                status
                type
                sourceAccount {
                    id
                    name
                    type
                    mask
                }
                destinationAccount {
                    id
                    name
                    type
                    mask
                }
                amount
                created
                month
                facility {
                    name
                }
            }
        }
    `;

    const TRANSFERS_BY_STATUS_QUERY = gql`
        query Query($status: TransferStatus!, $limit: Int!, $offset: Int) {
            userTransfersByStatus(
                status: $status
                limit: $limit
                offset: $offset
            ) {
                id
                status
                type
                sourceAccount {
                    id
                    name
                    type
                    mask
                }
                destinationAccount {
                    id
                    name
                    type
                    mask
                }
                amount
                created
                month
                facility {
                    name
                }
            }
        }
    `;

    const TRANSFERS_RECENT_QUERY = gql`
        query UserTransfers($limit: Int!, $offset: Int!) {
            userTransfers(limit: $limit, offset: $offset) {
                id
                status
                type
                sourceAccount {
                    id
                    name
                    type
                    mask
                }
                destinationAccount {
                    id
                    name
                    type
                    mask
                }
                amount
                created
                month
                facility {
                    name
                }
            }
        }
    `;

    const TRANSFER_CREATE_MUTATION = gql`
        mutation Mutation($input: CreateTransferInput!) {
            createTransfer(input: $input) {
                id
                status
                type
                sourceAccount {
                    id
                    name
                    type
                    mask
                }
                destinationAccount {
                    id
                    name
                    type
                    mask
                }
                amount
                created
            }
        }
    `;

    // Keeps track of queries in cache we need to update
    const cachedQueries = {};

    const useTransfersByStatus = (status, limit = 10, offset = 0) => {
        const {loading, error, data} = useQuery(TRANSFERS_BY_STATUS_QUERY, {
            variables: {
                status: status,
                limit: limit,
                offset: offset,
            },
        });

        const key = constructQueryCacheKey(
            TRANSFERS_BY_STATUS_QUERY,
            {
                status,
                limit,
                offset,
            },
            'userTransfersByStatus',
        );

        cachedQueries[key] = true;

        return {
            loading,
            error,
            transfers: data?.userTransfersByType.map(transferTransformer),
        };
    };

    const useTransfersByType = (type, limit = 10, offset = 0) => {
        const {loading, error, data} = useQuery(TRANSFERS_BY_TYPE_QUERY, {
            variables: {
                type: type,
                limit: limit,
                offset: offset,
            },
        });

        const key = constructQueryCacheKey(
            TRANSFERS_BY_TYPE_QUERY,
            {
                type,
                limit,
                offset,
            },
            'userTransfersByType',
        );

        cachedQueries[key] = true;

        return {
            loading,
            error,
            transfers: data?.userTransfersByType.map(transferTransformer),
        };
    };

    const useRecentTransfers = (limit = 10, offset = 0) => {
        const {loading, error, data} = useQuery(TRANSFERS_RECENT_QUERY, {
            variables: {
                limit: limit,
                offset: offset,
            },
        });

        const key = constructQueryCacheKey(
            TRANSFERS_RECENT_QUERY,
            {
                limit,
                offset,
            },
            'userTransfers',
        );

        cachedQueries[key] = true;

        return {
            loading,
            error,
            transfers: data?.userTransfers.map(transferTransformer),
        };
    };

    const useCreateTransfer = () => {
        const [internalCreateTransfer, {data, loading, error, reset}] =
            useMutation(TRANSFER_CREATE_MUTATION);

        const createTransfer = ({variables}) => {
            internalCreateTransfer({
                variables,
                update: (cache, {data}) => {
                    forceUpdateCache(cache, data.createTransfer);
                },
            });
        };

        return {
            createTransfer,
            loading,
            error,
            reset,
            transfer: data?.createTransfer,
        };
    };

    const forceUpdateCache = (cache, newData) => {
        // Update all cached queries
        Object.keys(cachedQueries).map((key) => {
            const {query, inputs, queryName} = deconstructQueryCacheKey(key);

            console.log({query, inputs, queryName});

            const cacheData = cache.readQuery({
                query: query,
                variables: {...inputs},
            });

            const transferList = cacheData ? cacheData[queryName] : [];
            const updatedTransferList = [];

            if (inputs.type && newData.type === inputs.type) {
                updatedTransferList.push(newData, ...transferList);

                if (inputs.limit) {
                    updatedTransferList.splice(inputs.limit);
                }

                // Offset not handled yet as it is a pain

                const updatedCacheData = {};
                updatedCacheData[queryName] = updatedTransferList;

                cache.writeQuery({
                    query: query,
                    variables: {...inputs},
                    data: updatedCacheData,
                });
            } else if (inputs.status) {
                // TODO unimplemented
            } else if (!inputs.type && !inputs.status) {
                updatedTransferList.push(newData, ...transferList);

                if (inputs.limit) {
                    updatedTransferList.splice(inputs.limit);
                }

                // Offset not handled yet as it is a pain

                const updatedCacheData = {};
                updatedCacheData[queryName] = updatedTransferList;

                cache.writeQuery({
                    query: query,
                    variables: {...inputs},
                    data: updatedCacheData,
                });
            }
        });
    };

    return {
        useTransfersByType,
        useTransfersByStatus,
        useRecentTransfers,
        useCreateTransfer,
    };
};
