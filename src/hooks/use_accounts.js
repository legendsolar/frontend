import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';

import {useQuery, gql, useMutation} from '@apollo/client';

const accountTransformer = (account) => {
    return {
        ...account,
    };
};

export const useAccount = () => {
    const useAccounts = () => {
        const ACCOUNTS_QUERY = gql`
            query AccountsQuery {
                userAccounts {
                    id
                    name
                    type
                    mask
                }
            }
        `;

        const {loading, error, data} = useQuery(ACCOUNTS_QUERY, {});

        return {
            loading,
            error,
            accounts: data?.userAccounts.map(accountTransformer),
        };
    };

    const useWallet = () => {
        const WALLET_QUERY = gql`
            query WalletQuery {
                userWallet {
                    id
                    name
                    type
                    mask
                }
            }
        `;

        const {loading, error, data} = useQuery(WALLET_QUERY, {});

        return {
            loading,
            error,
            wallet: data?.userWallet.map(accountTransformer),
        };
    };

    return {
        useAccounts,
        useWallet,
    };
};
