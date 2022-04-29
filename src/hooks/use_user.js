import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';

import {useQuery, gql, useMutation} from '@apollo/client';

const userContext = createContext();

export const ProvideUser = ({children}) => {
    const user = useProvideUser();
    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useUser = () => {
    return useContext(userContext);
};

export const useProvideUser = () => {
    const USER_STATUS_QUERY = gql`
        query User {
            user {
                id
                status
            }
        }
    `;

    const USER_ACCEPTANCE_QUERY = gql`
        query User {
            user {
                id
                acceptance
            }
        }
    `;

    const USER_ACCREDITATION_QUERY = gql`
        query User {
            user {
                id
                accreditation
            }
        }
    `;

    const MUTATE_USER = gql`
        mutation Mutation($input: UpdateUserInput!) {
            updateUser(input: $input) {
                user {
                    id
                    status
                    acceptance
                }
            }
        }
    `;

    const CREATE_DWOLLA_ACCOUNT = gql`
        mutation CreateUserDwollaAccount($input: UserDwollaAccountData!) {
            createUserDwollaAccount(input: $input) {
                user {
                    id
                    status
                    dwolla {
                        id
                    }
                }
            }
        }
    `;

    const CREATE_USER_TRANSFER = gql`
        mutation CreateTransfer($input: CreateTransferInput!) {
            createTransfer(input: $input) {
                id
            }
        }
    `;

    const USER_META_QUERY = gql`
        query User {
            user {
                firstName
                lastName
                address {
                    streetAddress
                    streetAddress2
                    city
                    state
                    postalCode
                }
                phone
                email
            }
        }
    `;

    const useGetUserStatus = () => {
        return useQuery(USER_STATUS_QUERY);
    };

    const useGetUserAcceptance = () => {
        return useQuery(USER_ACCEPTANCE_QUERY);
    };

    const useGetUserAccreditation = () => {
        return useQuery(USER_ACCREDITATION_QUERY);
    };

    const useSetUser = () => {
        return useMutation(MUTATE_USER);
    };

    const useCreateDwollaAccount = () => {
        return useMutation(CREATE_DWOLLA_ACCOUNT);
    };

    const useUserMetaData = () => {
        const {loading, error, data} = useQuery(USER_META_QUERY);

        const firstName = data?.user?.firstName ? data.user.firstName : '';
        const lastName = data?.user?.lastName ? data.user.lastName : '';
        const info = 'Member since 2022';

        return {
            loading,
            error,
            firstName,
            lastName,
            info,
            streetAddress: data?.user?.address?.streetAddress,
            streetAddress2: data?.user?.address?.streetAddress2,
            city: data?.user?.address?.city,
            postalCode: data?.user?.address?.postalCode,
            phone: data?.user?.phone,
            email: data?.user?.email,
        };
    };

    return {
        useGetUserStatus,
        useSetUser,
        useCreateDwollaAccount,
        useGetUserAcceptance,
        useGetUserAccreditation,
        useUserMetaData,
        // createUserTransfer: createUserTransfer,
    };
};
