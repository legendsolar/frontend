import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';

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

const transferTypeTransformer = (type) => {
    switch (type) {
        case 'DIVIDEND':
            return 'Dividend Payment';
        case 'INVESTMENT':
            return 'Investment';
        case 'TRANSFER':
            return 'Bank Transfer';
        default:
            return 'Unknown';
    }
};

const transferColorTransformer = (status) => {
    switch (status) {
        case 'FAILED':
            return 'eraserRed';
        case 'PENDING':
            return 'pencilYellow';
        case 'PROCESSED':
            return 'legendaryGreen';
        case 'CANCELLED':
            return 'eraserRed';
        case 'UNKNOWN':
            return 'eraserRed';
        default:
            return 'eraserRed';
    }
};

const transferTransformer = (transfer) => {
    return {
        ...transfer,
        title: transferTypeTransformer(transfer.type),
        destinationName: transfer.destinationAccount.name,
        sourceName: transfer.sourceAccount.name,
        color: transferColorTransformer(transfer.status),
    };
};

export const useProvideTransfer = () => {
    const TRANSFERS_BY_TYPE_QUERY = gql`
        query Query($status: TransferStatus!, $limit: Int!, $offset: Int) {
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

    const useTransfersByStatus = (status, limit = 10, offset = 0) => {
        const {loading, error, data} = useQuery(TRANSFERS_BY_STATUS_QUERY, {
            variables: {
                type: status,
                limit: limit,
                offset: offset,
            },
        });

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

        return {
            loading,
            error,
            transfers: data?.userTransfers.map(transferTransformer),
        };
    };

    const useCreateTransfer = () => {
        const [internalCreateTransfer, {data, loading, error}] = useMutation(
            TRANSFER_CREATE_MUTATION,
        );

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
            transfer: data?.createTransfer,
        };
    };

    const forceUpdateCache = (cache, newData) => {
        console.log('forceUpdateCache');
        const cacheData = cache.readQuery({
            query: TRANSFERS_RECENT_QUERY,
            variables: {limit: 5, offset: 0}, // TODO what if there's other queries in the cache?
        });
        console.log({cacheData});

        const updatedCacheData = {};
        updatedCacheData.userTransfers = [
            newData,
            ...cacheData.userTransfers.slice(0, 4),
        ];

        console.log({updatedCacheData});
        console.log({newData});

        cache.writeQuery({
            query: TRANSFERS_RECENT_QUERY,
            variables: {limit: 5, offset: 0},
            data: updatedCacheData,
        });
    };

    return {
        useTransfersByType,
        useTransfersByStatus,
        useRecentTransfers,
        useCreateTransfer,
    };
};
