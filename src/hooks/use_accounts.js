import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';
import {usePlaidLink} from 'react-plaid-link';
import {useQuery, gql, useMutation} from '@apollo/client';
import {
    constructQueryCacheKey,
    deconstructQueryCacheKey,
} from './query_cache_utils';

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
    const cachedQueries = {};

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

    /**
     * These requested fields must match the accounts query for
     * the client side cache manipulation to work
     * */

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

    const DELETE_ACCOUNT = gql`
        mutation Mutation($input: RemoveAccountInput) {
            removeAccount(input: $input) {
                id
                name
                type
                mask
            }
        }
    `;

    const useAccounts = () => {
        const {loading, error, data} = useQuery(ACCOUNTS_QUERY, {});

        const key = constructQueryCacheKey(ACCOUNTS_QUERY, {}, 'userAccounts');

        cachedQueries[key] = true;

        return {
            loading,
            error,
            accounts: data?.userAccounts.map(accountTransformer),
        };
    };

    const useWallet = () => {
        const {loading, error, data, refetch} = useQuery(WALLET_QUERY, {});

        return {
            loading,
            error,
            wallet: data?.userWallet
                ? accountTransformer(data.userWallet)
                : null,
            refetch,
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
        const [internalCreateAccount, {data, loading, error}] =
            useMutation(CREATE_ACCOUNT);

        const createAccount = ({variables}) => {
            internalCreateAccount({
                variables,
                update: (cache, {data}) => {
                    forceAddDataToCache(cache, data.createAccount);
                },
            });
        };

        return {
            createAccount,
            loading,
            error,
            account: data?.createAccount,
        };
    };

    // const useDeleteAccount = () => {
    //     const [internalDeleteAccount, {data, loading, error}] =
    //         useMutation(DELETE_ACCOUNT);

    //     const deleteAccount = ({variables}) => {
    //         internalDeleteAccount({
    //             variables,
    //             update: (cache, {data}) => {
    //                 forceRemoveDataFromCache(cache, data.removeAccount);
    //             },
    //         });
    //     };

    //     return {
    //         deleteAccount,
    //         loading,
    //         error,
    //         account: data?.deleteAccount,
    //     };
    // };

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

    const forceAddDataToCache = (cache, newData) => {
        // Update all cached queries
        Object.keys(cachedQueries).map((key) => {
            const {query, inputs, queryName} = deconstructQueryCacheKey(key);

            console.log({query, inputs, queryName});

            const cacheData = cache.readQuery({
                query: query,
                variables: {...inputs},
            });

            console.log({cacheData});

            const accountList = cacheData ? cacheData[queryName] : [];
            const updatedAccountList = [];

            updatedAccountList.push(newData, ...accountList);

            const updatedCacheData = {};
            updatedCacheData[queryName] = updatedAccountList;

            cache.writeQuery({
                query: query,
                variables: {...inputs},
                data: updatedCacheData,
            });
        });
    };

    // const forceRemoveDataFromCache = (cache, removeId) => {
    //     Object.keys(cachedQueries).map((key) => {
    //         const {query, inputs, queryName} = deconstructQueryCacheKey(key);

    //         console.log({query, inputs, queryName});

    //         const cacheData = cache.readQuery({
    //             query: query,
    //             variables: {...inputs},
    //         });

    //         console.log({cacheData});

    //         const accountList = cacheData ? cacheData[queryName] : [];
    //         const updatedAccountList = [];

    //         updatedAccountList.push(newData, ...accountList);

    //         const updatedCacheData = {};
    //         updatedCacheData[queryName] = updatedAccountList;

    //         cache.writeQuery({
    //             query: query,
    //             variables: {...inputs},
    //             data: updatedCacheData,
    //         });
    //     });
    // };

    return {
        useAccounts,
        useWallet,
        useCreateLinkToken,
        useCreateAccount,
        // useDeleteAccount,
        usePlaidLinkModal,
    };
};
