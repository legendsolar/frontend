import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';

import {useQuery, gql, useMutation} from '@apollo/client';
import {formatPhoneNumber} from 'validation/user_data_validation';

const userContext = createContext();

export const ProvideUser = ({children}) => {
    const user = useProvideUser();
    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useUser = () => {
    return useContext(userContext);
};

export const useProvideUser = () => {
    const {user, signup} = useAuth();

    const USER_STATUS_QUERY = gql`
        query User {
            user {
                id
                status {
                    verified
                    emailVerified
                    mfaVerified
                    acceptance
                    accreditation
                    dwollaStatus
                    dwollaSyncError
                }
            }
        }
    `;

    const USER_ACCEPTANCE_QUERY = gql`
        query User {
            user {
                id
                status {
                    acceptance
                }
            }
        }
    `;

    const USER_ACCREDITATION_QUERY = gql`
        query User {
            user {
                id
                status {
                    accreditation
                }
            }
        }
    `;

    const USER_FACILITIES_QUERY = gql`
        query UserFacilities {
            userFacilities {
                id
                name
                created
                address {
                    streetAddress
                    city
                    state
                }
                generationMetaData {
                    max_kW
                    dollar_per_kWh
                    co2_per_kWh
                    make
                }
                summary {
                    totalGeneration_kWh
                    pastYearGeneration_kWh
                    pastMonthGeneration_kWh
                    twentyFourHourGeneration_kWh
                    yearToDate_kWh
                    monthToDate_kWh
                    pastWeek_kWh
                    day_kWh
                    uptime_percentage
                    performance_ratio
                }
                economics {
                    ppaDuration
                    leaseRemaining
                }
            }
        }
    `;

    const MUTATE_USER = gql`
        mutation Mutation($input: UpdateUserInput!) {
            updateUser(input: $input) {
                user {
                    id
                    status {
                        verified
                        emailVerified
                        mfaVerified
                        acceptance
                        accreditation
                        dwollaStatus
                        dwollaSyncError
                    }
                }
            }
        }
    `;

    const MUTATE_USER_ON_CREATE = gql`
        mutation Mutation($input: UpdateUserInput!) {
            updateUser(input: $input) {
                user {
                    id
                    status {
                        verified
                        emailVerified
                        mfaVerified
                        acceptance
                        accreditation
                        dwollaStatus
                        dwollaSyncError
                    }
                    firstName
                    lastName
                    email
                    phone
                }
            }
        }
    `;

    const CREATE_DWOLLA_ACCOUNT = gql`
        mutation CreateUserDwollaAccount($input: UserDwollaAccountData!) {
            createUserDwollaAccount(input: $input) {
                user {
                    id
                    status {
                        verified
                        emailVerified
                        mfaVerified
                        acceptance
                        accreditation
                        dwollaStatus
                        dwollaSyncError
                    }
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
                id
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
        const {loading, error, data, refetch} = useQuery(USER_STATUS_QUERY);

        return {
            loading,
            error,
            status: data?.user?.status,
            refetch,
        };
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
        const [createDwollaAccount, {data, loading, error}] = useMutation(
            CREATE_DWOLLA_ACCOUNT,
        );

        return {
            createDwollaAccount,
            data,
            loading,
            error,
        };
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

    const useGetUserFacilities = () => {
        const {loading, error, data} = useQuery(USER_FACILITIES_QUERY);

        return {
            facilities: data?.userFacilities,
            loading,
            error,
        };
    };

    const useCreateNewUser = () => {
        const [createNewUserInternal, {data, loading, error}] = useMutation(
            MUTATE_USER_ON_CREATE,
        );

        return {
            createNewUser: async ({
                firstName,
                lastName,
                password,
                phone,
                email,
            }) => {
                await signup(email, password);
                return createNewUserInternal({
                    variables: {
                        input: {
                            firstName,
                            lastName,
                            phone: formatPhoneNumber(phone),
                        },
                    },
                });
            },
            data,
            loading,
            error,
        };
    };

    const useUpdateUserAccreditation = () => {
        const [setUser, {data, loading, error}] = useSetUser();

        return {
            data,
            loading,
            error,
            update: (accreditation) =>
                setUser({
                    variables: {
                        input: {
                            accreditation,
                        },
                    },
                }),
        };
    };

    return {
        useCreateNewUser,
        useGetUserStatus,
        useSetUser,
        useCreateDwollaAccount,
        useGetUserAcceptance,
        useGetUserAccreditation,
        useUserMetaData,
        useGetUserFacilities,
        useUpdateUserAccreditation,
    };
};
