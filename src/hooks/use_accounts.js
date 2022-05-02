import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';
import {usePlaidLink} from 'react-plaid-link';
import {useQuery, gql, useMutation} from '@apollo/client';

const accountContext = createContext();

export const ProvideAccount = ({children}) => {
    const account = useProvideAccount();
    return (
        <accountContext.Provider value={account}>
            {children}
        </accountContext.Provider>
    );
};

export const useAccount = () => {
    return useContext(accountContext);
};

const accountTransformer = (account) => {
    return {
        ...account,
    };
};

export const useProvideAccount = () => {
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
                    amount
                }
            }
        `;

        const {loading, error, data} = useQuery(WALLET_QUERY, {});

        return {
            loading,
            error,
            wallet: data?.userWallet
                ? accountTransformer(data.userWallet)
                : null,
        };
    };

    const useCreateLinkToken = () => {
        const CREATE_LINK_TOKEN = gql`
            mutation CreatePlaidLinkToken {
                createPlaidLinkToken {
                    token
                }
            }
        `;

        const [createLinkToken, {data, loading, error}] =
            useMutation(CREATE_LINK_TOKEN);

        return {
            createLinkToken,
            loading,
            error,
            token: data?.createPlaidLinkToken?.token,
        };
    };

    const useCreateAccount = () => {
        const CREATE_ACCOUNT = gql`
            mutation Mutation($input: CreateAccountInput) {
                createAccount(input: $input) {
                    id
                    name
                    type
                    mask
                }
            }
        `;

        const [createAccount, {data, loading, error}] =
            useMutation(CREATE_ACCOUNT);

        return {
            createAccount,
            loading,
            error,
            account: data?.createAccount,
        };
    };

    const usePlaidLinkModal = (token, onComplete) => {
        const {open, ready} = usePlaidLink({
            token: token,
            onSuccess: (public_token, metadata) => {
                onComplete({publicToken: public_token, metadata});
            },
        });
        return {
            open,
            ready,
        };
    };

    return {
        useAccounts,
        useWallet,
        useCreateLinkToken,
        useCreateAccount,
        usePlaidLinkModal,
    };
};
