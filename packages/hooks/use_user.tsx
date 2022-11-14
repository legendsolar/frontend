import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './use_auth';

import {useQuery, gql, useMutation, ApolloError} from '@apollo/client';
import {formatPhoneNumber} from '@p/utils/validation';
import {
    AcceptanceStatus,
    AccreditationOptions,
    Facility,
    UserStatus,
    UpdateUserInput,
    UserDwollaAccountData,
} from '@p/schema';
import {removeNullObjectValues} from '@p/utils/object_utils';

interface useUserReturnType {
    useGetUserStatus(skip?: boolean): {
        loading: boolean;
        error: ApolloError | undefined;
        status: UserStatus;
        refetch(): void;
    };

    useGetUserAcceptance(): {
        loading: boolean;
        error: ApolloError | undefined;
        acceptance: Array<AcceptanceStatus> | undefined;
        refetch(): void;
    };

    useGetUserAccreditation(): {
        loading: boolean;
        error: ApolloError | undefined;
        accreditation: Array<AccreditationOptions> | undefined;
        refetch(): void;
    };

    useSetUser(): {
        setUser: (input: UpdateUserInput) => Promise<any>;
        data: any;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useCreateDwollaAccount(): {
        createDwollaAccount: (input: UserDwollaAccountData) => Promise<any>;
        data: any;
        loading: boolean;
        error: ApolloError | undefined;
    };

    useUserMetaData(): {
        loading: boolean;
        error: ApolloError | undefined;
        firstName: string;
        lastName: string;
        info: string;
        streetAddress: string;
        streetAddress2: string;
        city: string;
        state: string;
        postalCode: string;
        phone: string;
        email: string;
    };

    useCreateNewUser(): {
        createNewUser({
            firstName,
            lastName,
            password,
            phone,
            email,
        }: {
            firstName: string;
            lastName: string;
            password: string;
            phone: string;
            email: string;
        }): Promise<any>;
        data: any;
        loading: boolean;
        error: ApolloError | undefined;
    };
    useGetUserFacilities(): {
        facilities: Array<Facility>;
        loading: boolean;
        error: ApolloError | undefined;
    };
    useUpdateUserAccreditation(): {
        data: any;
        loading: boolean;
        error: ApolloError | undefined;
        update: (accreditation: Array<AccreditationOptions>) => void;
    };
}

const userContext = createContext<useUserReturnType>({} as useUserReturnType);

export const ProvideUser = ({children}) => {
    const user = useProvideUser();
    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useUser = () => {
    return useContext(userContext);
};

export const useProvideUser = (): useUserReturnType => {
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
                    panel_count
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
                    cost_dollars
                }
                location {
                    lat
                    lng
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
                    firstName
                    lastName
                    email
                    phone
                    address {
                        streetAddress
                        streetAddress2
                        city
                        state
                        postalCode
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
                    address {
                        streetAddress
                        streetAddress2
                        city
                        state
                        postalCode
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
    /**
     * Warning: skip behavior only works as expected if transitioning from false->true
     * @param {}
     * @returns
     */
    const useGetUserStatus = (skip: boolean = false) => {
        const {loading, error, data, refetch} = useQuery(USER_STATUS_QUERY, {
            skip,
        });

        return {
            loading,
            error,
            status: data?.user?.status,
            refetch,
        };
    };

    const useGetUserAcceptance = () => {
        const {loading, error, data, refetch} = useQuery(USER_ACCEPTANCE_QUERY);

        return {
            loading,
            error,
            acceptance: data?.user?.status
                ?.acceptance as Array<AcceptanceStatus>,
            refetch,
        };
    };

    const useGetUserAccreditation = () => {
        const {loading, error, data, refetch} = useQuery(
            USER_ACCREDITATION_QUERY,
        );

        return {
            loading,
            error,
            accreditation: data?.user?.status
                ?.accreditation as Array<AccreditationOptions>,
            refetch,
        };
    };

    const useSetUser = () => {
        const [setUserInternal, {data, loading, error}] =
            useMutation(MUTATE_USER);

        return {
            setUser: ({
                address,
                phone,
                acceptance,
                accreditation,
                firstName,
                lastName,
            }: UpdateUserInput) => {
                const input = {
                    address,
                    phone: phone ? formatPhoneNumber(phone) : null,
                    acceptance,
                    accreditation,
                    firstName,
                    lastName,
                };

                removeNullObjectValues(input);

                return setUserInternal({
                    variables: {
                        input,
                    },
                });
            },
            data,
            loading,
            error,
        };
    };

    const useCreateDwollaAccount = () => {
        const [createDwollaAccountInternal, {data, loading, error}] =
            useMutation(CREATE_DWOLLA_ACCOUNT);

        return {
            createDwollaAccount: (input: UserDwollaAccountData) =>
                createDwollaAccountInternal({variables: {input}}),
            data,
            loading,
            error,
        };
    };

    const useUserMetaData = () => {
        const {loading, error, data} = useQuery(USER_META_QUERY);

        const firstName: string = data?.user?.firstName
            ? data.user.firstName
            : '';
        const lastName: string = data?.user?.lastName ? data.user.lastName : '';
        const info = 'Member since 2022';

        return {
            loading,
            error,
            firstName,
            lastName,
            info,
            streetAddress: data?.user?.address?.streetAddress as string,
            streetAddress2: data?.user?.address?.streetAddress2 as string,
            city: data?.user?.address?.city as string,
            state: data?.user?.address?.state as string,
            postalCode: data?.user?.address?.postalCode as string,
            phone: data?.user?.phone as string,
            email: data?.user?.email as string,
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
            }: {
                firstName: string;
                lastName: string;
                password: string;
                phone: string;
                email: string;
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
        const {setUser, data, loading, error} = useSetUser();

        return {
            data,
            loading,
            error,
            update: (accreditation: Array<AccreditationOptions>) =>
                setUser({
                    accreditation,
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
