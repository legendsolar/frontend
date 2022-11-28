import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';
import {usePlaidLink} from 'react-plaid-link';
import {
    useQuery,
    gql,
    useMutation,
    ApolloError,
    ApolloCache,
} from '@apollo/client';
import {
    constructQueryCacheKey,
    deconstructQueryCacheKey,
} from './query_cache_utils';
import {LOCAL_STORAGE_KEYS} from 'storage/local_storage_keys';
import {
    BankAccount,
    CreateAccountInput,
    RemoveAccountInput,
    Wallet,
} from 'schema/schema_gen_types';

interface useAccountReturnType {
    useAccounts(): {
        accounts: Array<BankAccount>;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useWallet(): {
        wallet: Wallet | undefined;
        loading: boolean;
        error: ApolloError | undefined;
        refetch(): void;
    };

    useCreateLinkToken(): {
        createLinkToken: (accessToken?: string) => Promise<string>;
        token: string | undefined;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useCreateAccount(): {
        createAccount: (input: CreateAccountInput) => Promise<BankAccount>;
        account: BankAccount | undefined;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useDeleteAccount(): {
        deleteAccount: (input: RemoveAccountInput) => Promise<BankAccount>;
        account: BankAccount | undefined;
        loading: boolean;
        error: ApolloError | undefined;
    };
}

const accountContext = createContext<useAccountReturnType>(
    {} as useAccountReturnType,
);

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

export const useProvideAccount = (): useAccountReturnType => {
    const cachedQueries = {};

    const ACCOUNTS_QUERY = gql`
        query AccountsQuery {
            userAccounts {
                id
                name
                type
                mask
                status
                plaid {
                    id
                    status
                    accessToken
                }
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
                status
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
                status
            }
        }
    `;

    const CREATE_LINK_TOKEN = gql`
        mutation CreatePlaidLinkToken($input: CreatLinkTokenInput) {
            createPlaidLinkToken(input: $input) {
                token
            }
        }
    `;

    const useAccounts = () => {
        const {loading, error, data} = useQuery(ACCOUNTS_QUERY, {});

        const key = constructQueryCacheKey({
            query: ACCOUNTS_QUERY,
            inputs: {},
            queryName: 'userAccounts',
        });

        cachedQueries[key] = true;

        return {
            loading,
            error,
            accounts: data?.userAccounts ? data.userAccounts : [],
        };
    };

    const useWallet = () => {
        const {loading, error, data, refetch} = useQuery(WALLET_QUERY, {});

        return {
            loading,
            error,
            wallet: data?.userWallet,
            refetch,
        };
    };

    const useGetLinkToken = () => {
        const [createLinkToken, {data, loading, error}] =
            useMutation(CREATE_LINK_TOKEN);

        const token = data?.createPlaidLinkToken?.token;

        if (token && !loading && !error) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.PLAID_LINK_TOKEN, token);
        }

        return {
            createLinkToken: async (accessToken?: string) => {
                const input = {
                    accessToken,
                };

                const resp = await createLinkToken({
                    variables: {
                        input,
                    },
                });

                return resp.data.createPlaidLinkToken.token;
            },
            loading,
            error,
            token: data?.createPlaidLinkToken?.token,
        };
    };

    const useCreateAccount = () => {
        const [internalCreateAccount, {data, loading, error}] =
            useMutation(CREATE_ACCOUNT);

        const createAccount = async (input: CreateAccountInput) => {
            const resp = await internalCreateAccount({
                variables: {input},
                update: (cache, {data}) => {
                    forceAddDataToCache(cache, data.createAccount);
                },
            });

            return resp.data.createAccount;
        };

        return {
            createAccount,
            loading,
            error,
            account: data?.createAccount,
        };
    };

    const useDeleteAccount = () => {
        const [internalDeleteAccount, {data, loading, error}] =
            useMutation(DELETE_ACCOUNT);

        const deleteAccount = async (input: RemoveAccountInput) => {
            const resp = await internalDeleteAccount({
                variables: {input},
                update: (cache, {data}) => {
                    forceRemoveDataFromCache(cache, data.removeAccount.id);
                },
            });

            return resp.data.deleteAccount;
        };

        return {
            deleteAccount,
            loading,
            error,
            account: data?.deleteAccount,
        };
    };

    const forceAddDataToCache = (cache: ApolloCache<any>, newData: any) => {
        // Update all cached queries
        Object.keys(cachedQueries).map((key) => {
            const {query, inputs, queryName} = deconstructQueryCacheKey(key);

            const cacheData = cache.readQuery({
                query: query,
                variables: {...inputs},
            }) as Array<any>;

            const accountList = cacheData[queryName]
                ? cacheData[queryName]
                : [];

            const updatedAccountList = [newData, ...accountList];

            const updatedCacheData = {};
            updatedCacheData[queryName] = updatedAccountList;

            cache.writeQuery({
                query: query,
                variables: {...inputs},
                data: updatedCacheData,
            });
        });
    };

    const forceRemoveDataFromCache = (
        cache: ApolloCache<any>,
        removeId: string,
    ) => {
        Object.keys(cachedQueries).map((key) => {
            const {query, inputs, queryName} = deconstructQueryCacheKey(key);

            const cacheData = cache.readQuery({
                query: query,
                variables: {...inputs},
            }) as Array<any>;

            const accountList = cacheData[queryName]
                ? cacheData[queryName]
                : [];

            const updatedAccountList = accountList.filter(
                (account) => account.id !== removeId,
            );

            const updatedCacheData = {};
            updatedCacheData[queryName] = updatedAccountList;

            cache.writeQuery({
                query: query,
                variables: {...inputs},
                data: updatedCacheData,
            });
        });
    };

    return {
        useAccounts,
        useWallet,
        useCreateLinkToken: useGetLinkToken,
        useCreateAccount,
        useDeleteAccount,
    };
};
