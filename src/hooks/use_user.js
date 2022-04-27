// import React, {useState, useEffect, useContext, createContext} from 'react';
// import {useAuth} from './use_auth';

import {useQuery, gql, useMutation} from '@apollo/client';

// const userContext = createContext();

// export const ProvideUser = ({children}) => {
//     const user = useProvideUser();
//     return <userContext.Provider value={user}>{children}</userContext.Provider>;
// };

// export const useUser = () => {
//     return useContext(userContext);
// };

// const useProvideUser = () => {
//     const auth = useAuth();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     return {
//         user: user,
//         loading: loading,
//     };
// };

export const useUser = () => {
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

    const USER_NAME_QUERY = gql`
        query User {
            user {
                firstName
                lastName
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
        const {loading, error, data} = useQuery(USER_NAME_QUERY);

        const firstName = data?.user?.firstName;
        const lastName = data?.user?.lastName;
        const info = 'Member since 2022';

        return {
            loading,
            error,
            firstName,
            lastName,
            info,
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
