import {gql} from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export enum AcceptanceStatus {
    Dwolla = 'DWOLLA',
    Privacy = 'PRIVACY',
    TermsConditions = 'TERMS_CONDITIONS',
}

export type Account = {
    created?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    mask?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    status?: Maybe<DwollaAccountStatus>;
    type?: Maybe<AccountType>;
    valid?: Maybe<Scalars['Boolean']>;
};

export type AccountInput = {
    type?: InputMaybe<AccountType>;
};

export enum AccountType {
    Checking = 'CHECKING',
    Savings = 'SAVINGS',
    Unknown = 'UNKNOWN',
    Wallet = 'WALLET',
}

export enum AccreditationOptions {
    EntityOwner = 'ENTITY_OWNER',
    Income = 'INCOME',
    LicenseHolder = 'LICENSE_HOLDER',
    NetWorth = 'NET_WORTH',
    None = 'NONE',
}

export type AddUserInput = {
    email?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
};

export type Address = {
    __typename?: 'Address';
    city?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    streetAddress?: Maybe<Scalars['String']>;
    streetAddress2?: Maybe<Scalars['String']>;
};

export type AddressInput = {
    city: Scalars['String'];
    postalCode: Scalars['String'];
    state: Scalars['String'];
    streetAddress: Scalars['String'];
    streetAddress2?: InputMaybe<Scalars['String']>;
};

export type BankAccount = Account & {
    __typename?: 'BankAccount';
    created?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    institution: Scalars['String'];
    mask?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    plaid: PlaidAccountData;
    status?: Maybe<DwollaAccountStatus>;
    type?: Maybe<AccountType>;
    valid?: Maybe<Scalars['Boolean']>;
};

export type CreatLinkTokenInput = {
    accessToken?: InputMaybe<Scalars['String']>;
};

export type CreateAccountInput = {
    institution: Scalars['String'];
    mask: Scalars['String'];
    name: Scalars['String'];
    plaidId: Scalars['String'];
    plaidStatus: PlaidAccountStatus;
    publicToken: Scalars['String'];
    type: AccountType;
};

export type CreateTransferInput = {
    amount: Scalars['String'];
    destinationAccountId: Scalars['String'];
    sourceAccountId: Scalars['String'];
};

export enum DwollaAccountStatus {
    Unknown = 'UNKNOWN',
    Unverified = 'UNVERIFIED',
    Verified = 'VERIFIED',
}

export enum DwollaUserStatus {
    Created = 'CREATED',
    Deactivated = 'DEACTIVATED',
    DocumentReq = 'DOCUMENT_REQ',
    KbaReq = 'KBA_REQ',
    RetryReq = 'RETRY_REQ',
    Unknown = 'UNKNOWN',
    Verified = 'VERIFIED',
}

export type EarningsTotals = {
    __typename?: 'EarningsTotals';
    pastMonthEarnings_Dollars: TotalOverTime;
    pastWeekEarnings_Dollars: TotalOverTime;
    pastYearEarnings_Dollars: TotalOverTime;
    totalEarnings_Dollars: Scalars['Float'];
    twentyFourHourEarnings_Dollars: TotalOverTime;
};

export type EconomicsSummary = {
    __typename?: 'EconomicsSummary';
    cost_dollars: Scalars['Float'];
    leaseRemaining: Scalars['String'];
    ppaDuration: Scalars['String'];
};

export type Facility = {
    __typename?: 'Facility';
    address: Address;
    created: Scalars['String'];
    earningsTotals: EarningsTotals;
    economics: EconomicsSummary;
    generationMetaData: GenerationMetaData;
    generationTotals: GenerationTotals;
    id: Scalars['ID'];
    location: Location;
    name: Scalars['String'];
};

export type GenerationDatum = {
    __typename?: 'GenerationDatum';
    time: Scalars['String'];
    wattage: Scalars['Float'];
};

export type GenerationMetaData = {
    __typename?: 'GenerationMetaData';
    co2_per_kWh: Scalars['Float'];
    dollar_per_kWh: Scalars['Float'];
    generationBasedEarnings: Scalars['Boolean'];
    make?: Maybe<Scalars['String']>;
    max_kW: Scalars['Float'];
    panel_count: Scalars['Int'];
};

export type GenerationTotals = {
    __typename?: 'GenerationTotals';
    pastMonthGeneration_kWh: TotalOverTime;
    pastWeek_kWh: TotalOverTime;
    pastYearGeneration_kWh: TotalOverTime;
    totalGeneration_kWh: Scalars['Float'];
    twentyFourHourGeneration_kWh: TotalOverTime;
};

export type KbaSession = {
    __typename?: 'KbaSession';
    id: Scalars['ID'];
    questions: Array<KbaSessionQuestion>;
};

export type KbaSessionAnswer = {
    __typename?: 'KbaSessionAnswer';
    id: Scalars['ID'];
    text: Scalars['String'];
};

export type KbaSessionInput = {
    answerId: Scalars['ID'];
    questionId: Scalars['ID'];
};

export type KbaSessionQuestion = {
    __typename?: 'KbaSessionQuestion';
    answers: Array<KbaSessionAnswer>;
    id: Scalars['ID'];
    text: Scalars['String'];
};

export type Location = {
    __typename?: 'Location';
    lat: Scalars['Float'];
    lng: Scalars['Float'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createAccount?: Maybe<BankAccount>;
    createPlaidLinkToken?: Maybe<PlaidLinkToken>;
    createTransfer?: Maybe<Transfer>;
    createUserDwollaAccount: UpdateUserMutationResponse;
    removeAccount?: Maybe<BankAccount>;
    submitIdVerificationDocument: UpdateUserMutationResponse;
    submitKbaSession: UpdateUserMutationResponse;
    updateUser: UpdateUserMutationResponse;
};

export type MutationCreateAccountArgs = {
    input?: InputMaybe<CreateAccountInput>;
};

export type MutationCreatePlaidLinkTokenArgs = {
    input?: InputMaybe<CreatLinkTokenInput>;
};

export type MutationCreateTransferArgs = {
    input: CreateTransferInput;
};

export type MutationCreateUserDwollaAccountArgs = {
    input: UserDwollaAccountData;
};

export type MutationRemoveAccountArgs = {
    input?: InputMaybe<RemoveAccountInput>;
};

export type MutationSubmitIdVerificationDocumentArgs = {
    input?: InputMaybe<VerificationDocumentInput>;
};

export type MutationSubmitKbaSessionArgs = {
    input?: InputMaybe<SubmitKbaSessionInput>;
};

export type MutationUpdateUserArgs = {
    input: UpdateUserInput;
};

export type MutationResponse = {
    code: Scalars['String'];
    message: Scalars['String'];
    success: Scalars['Boolean'];
};

export type PlaidAccountData = {
    __typename?: 'PlaidAccountData';
    accessToken: Scalars['String'];
    id: Scalars['ID'];
    processorToken?: Maybe<Scalars['String']>;
    status: PlaidAccountStatus;
};

export enum PlaidAccountStatus {
    Failed = 'FAILED',
    PendingVerification = 'PENDING_VERIFICATION',
    Unverified = 'UNVERIFIED',
    Verified = 'VERIFIED',
}

export type PlaidLinkToken = {
    __typename?: 'PlaidLinkToken';
    expiration: Scalars['String'];
    requestId: Scalars['String'];
    token: Scalars['String'];
};

export type PlaidLinkTokenInput = {
    expiration: Scalars['String'];
    redirectUri: Scalars['String'];
    requestId: Scalars['String'];
    token: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    facilityGenerationByDate?: Maybe<Array<GenerationDatum>>;
    recentFacilityGenerationBySample?: Maybe<Array<GenerationDatum>>;
    user?: Maybe<User>;
    userAccounts?: Maybe<Array<BankAccount>>;
    userFacilities?: Maybe<Array<Facility>>;
    userKbaSession?: Maybe<KbaSession>;
    userTransfers?: Maybe<Array<Transfer>>;
    userTransfersByStatus?: Maybe<Array<Transfer>>;
    userTransfersByType?: Maybe<Array<Transfer>>;
    userWallet?: Maybe<Wallet>;
};

export type QueryFacilityGenerationByDateArgs = {
    end: Scalars['String'];
    id: Scalars['String'];
    resolution_ms?: InputMaybe<Scalars['Int']>;
    start: Scalars['String'];
};

export type QueryRecentFacilityGenerationBySampleArgs = {
    id: Scalars['String'];
    limit?: Scalars['Int'];
    offset?: Scalars['Int'];
};

export type QueryUserTransfersArgs = {
    limit?: Scalars['Int'];
    offset?: Scalars['Int'];
};

export type QueryUserTransfersByStatusArgs = {
    limit?: Scalars['Int'];
    offset?: InputMaybe<Scalars['Int']>;
    status: TransferStatus;
};

export type QueryUserTransfersByTypeArgs = {
    limit?: Scalars['Int'];
    offset?: InputMaybe<Scalars['Int']>;
    type: TransferType;
};

export type RemoveAccountInput = {
    accountId: Scalars['ID'];
};

export type SubmitIdVerifDocMutResp = {
    __typename?: 'SubmitIdVerifDocMutResp';
    code: Scalars['String'];
    message: Scalars['String'];
    success: Scalars['Boolean'];
};

export type SubmitKbaSessionInput = {
    id: Scalars['ID'];
    questionAnswers: Array<KbaSessionInput>;
};

export type SubmitKbaSessionMutResp = {
    __typename?: 'SubmitKbaSessionMutResp';
    code: Scalars['String'];
    message: Scalars['String'];
    success: Scalars['Boolean'];
};

export type TotalOverTime = {
    __typename?: 'TotalOverTime';
    average: Scalars['Float'];
    best: Scalars['Float'];
    current: Scalars['Float'];
};

export type Transfer = {
    __typename?: 'Transfer';
    amount: Scalars['String'];
    created: Scalars['String'];
    destinationAccount: Account;
    facility?: Maybe<Facility>;
    facilityId?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    month?: Maybe<Scalars['String']>;
    originationId: Scalars['String'];
    sourceAccount: Account;
    status: TransferStatus;
    type: TransferType;
    userId?: Maybe<Scalars['String']>;
};

export enum TransferStatus {
    Cancelled = 'CANCELLED',
    Failed = 'FAILED',
    Pending = 'PENDING',
    Processed = 'PROCESSED',
    Unknown = 'UNKNOWN',
}

export enum TransferType {
    Dividend = 'DIVIDEND',
    Investment = 'INVESTMENT',
    Transfer = 'TRANSFER',
    Unknown = 'UNKNOWN',
}

export type UpdateUserInput = {
    acceptance?: InputMaybe<Array<AcceptanceStatus>>;
    accreditation?: InputMaybe<Array<AccreditationOptions>>;
    address?: InputMaybe<AddressInput>;
    firstName?: InputMaybe<Scalars['String']>;
    lastName?: InputMaybe<Scalars['String']>;
    phone?: InputMaybe<Scalars['String']>;
};

export type UpdateUserMutationResponse = MutationResponse & {
    __typename?: 'UpdateUserMutationResponse';
    code: Scalars['String'];
    message: Scalars['String'];
    success: Scalars['Boolean'];
    user?: Maybe<User>;
};

export type User = {
    __typename?: 'User';
    address?: Maybe<Address>;
    dwolla?: Maybe<UserDwollaData>;
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    lastName?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    status?: Maybe<UserStatus>;
};

export type UserDwollaAccountData = {
    address: AddressInput;
    dateOfBirth: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    ssn: Scalars['String'];
};

export type UserDwollaData = {
    __typename?: 'UserDwollaData';
    correlationId?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    status?: Maybe<DwollaUserStatus>;
    verified?: Maybe<Scalars['Boolean']>;
};

export type UserStatus = {
    __typename?: 'UserStatus';
    acceptance?: Maybe<Array<AcceptanceStatus>>;
    accreditation?: Maybe<Array<AccreditationOptions>>;
    dwollaStatus?: Maybe<DwollaUserStatus>;
    dwollaSyncError?: Maybe<Scalars['Boolean']>;
    emailVerified?: Maybe<Scalars['Boolean']>;
    mfaVerified?: Maybe<Scalars['Boolean']>;
    verified?: Maybe<Scalars['Boolean']>;
};

export type VerificationDocumentInput = {
    path?: InputMaybe<Scalars['String']>;
};

export type Wallet = Account & {
    __typename?: 'Wallet';
    amount?: Maybe<Scalars['String']>;
    created?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    mask?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    status?: Maybe<DwollaAccountStatus>;
    type?: Maybe<AccountType>;
    valid?: Maybe<Scalars['Boolean']>;
};
