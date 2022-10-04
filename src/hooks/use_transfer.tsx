import React, {useState, useEffect, useContext, createContext} from 'react';
import {
    constructQueryCacheKey,
    deconstructQueryCacheKey,
} from './query_cache_utils';
import {format} from 'date-fns';
import {transferTransformer} from 'components/transfers/transfer_transforms';
import {useQuery, gql, useMutation, ApolloError} from '@apollo/client';
import {
    CreateTransferInput,
    Transfer,
    TransferStatus,
    TransferType,
} from 'schema/schema_gen_types';

interface useTransferReturnType {
    useTransfersByType(
        type: TransferType,
        limit?: number,
        offest?: number,
    ): {
        transfers: Array<Transfer>;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useTransfersByStatus(
        status: TransferStatus,
        limit?: number,
        offset?: number,
    ): {
        transfers: Array<Transfer>;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useRecentTransfers(
        limit?: number,
        offset?: number,
    ): {
        transfers: Array<Transfer>;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useCreateTransfer(): {
        transfer: Transfer | undefined;
        loading: boolean;
        error: ApolloError | undefined;
        reset(): void;
        createTransfer(input: CreateTransferInput): Promise<Transfer>;
    };
}

const transferContext = createContext<useTransferReturnType>(
    {} as useTransferReturnType,
);

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

export const useProvideTransfer = (): useTransferReturnType => {
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

        const key = constructQueryCacheKey({
            query: TRANSFERS_BY_STATUS_QUERY,
            inputs: {
                status,
                limit,
                offset,
            },
            queryName: 'userTransfersByStatus',
        });

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

        const key = constructQueryCacheKey({
            query: TRANSFERS_BY_TYPE_QUERY,
            inputs: {
                type,
                limit,
                offset,
            },
            queryName: 'userTransfersByType',
        });

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

        const key = constructQueryCacheKey({
            query: TRANSFERS_RECENT_QUERY,
            inputs: {
                limit,
                offset,
            },
            queryName: 'userTransfers',
        });

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

        const createTransfer = async (
            input: CreateTransferInput,
        ): Promise<Transfer> => {
            const resp = await internalCreateTransfer({
                variables: {input},
                update: (cache, {data}) => {
                    forceUpdateCache(cache, data.createTransfer);
                },
            });

            return resp.data.createTransfer;
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
            const updatedTransferList: Array<any> = [];

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
