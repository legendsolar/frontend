import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';

import {useQuery, gql, useMutation} from '@apollo/client';

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

export const useTransfer = () => {
    const useTransfersByStatus = (status, limit = 10, offset = 0) => {
        const TRANSFERS_BY_TYPE_QUERY = gql`
            query Query($status: TransferStatus!, $limit: Int!, $offset: Int) {
                userTransfersByType(
                    type: $type
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

        const {loading, error, data} = useQuery(TRANSFERS_BY_TYPE_QUERY, {
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
        const TRANSFERS_BY_TYPE_QUERY = gql`
            query Query($type: TransferType!, $limit: Int!, $offset: Int) {
                userTransfersByType(
                    type: $type
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

    return {
        useTransfersByType,
        useTransfersByStatus,
    };
};
