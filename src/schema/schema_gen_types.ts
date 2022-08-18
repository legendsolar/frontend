import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  TermsConditions = 'TERMS_CONDITIONS'
}

export type Account = {
  created?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mask?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<AccountStatus>;
  type?: Maybe<AccountType>;
  valid?: Maybe<Scalars['Boolean']>;
};

export type AccountInput = {
  type?: InputMaybe<AccountType>;
};

export enum AccountStatus {
  Unknown = 'UNKNOWN',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export enum AccountType {
  Checking = 'CHECKING',
  Savings = 'SAVINGS',
  Unknown = 'UNKNOWN',
  Wallet = 'WALLET'
}

export enum AccreditationOptions {
  EntityOwner = 'ENTITY_OWNER',
  Income = 'INCOME',
  LicenseHolder = 'LICENSE_HOLDER',
  NetWorth = 'NET_WORTH',
  None = 'NONE'
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
  institution?: Maybe<Scalars['String']>;
  mask?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<AccountStatus>;
  type?: Maybe<AccountType>;
  valid?: Maybe<Scalars['Boolean']>;
};

export type CreateAccountInput = {
  institution: Scalars['String'];
  mask: Scalars['String'];
  name: Scalars['String'];
  plaidId: Scalars['String'];
  publicToken: Scalars['String'];
  type: AccountType;
};

export type CreateTransferInput = {
  amount: Scalars['String'];
  destinationAccountId: Scalars['String'];
  sourceAccountId: Scalars['String'];
};

export enum DwollaUserStatus {
  Created = 'CREATED',
  Deactivated = 'DEACTIVATED',
  DocumentReq = 'DOCUMENT_REQ',
  KbaReq = 'KBA_REQ',
  RetryReq = 'RETRY_REQ',
  Unknown = 'UNKNOWN',
  Verified = 'VERIFIED'
}

export type EconomicsSummary = {
  __typename?: 'EconomicsSummary';
  cost_dollars?: Maybe<Scalars['Float']>;
  leaseRemaining?: Maybe<Scalars['String']>;
  ppaDuration?: Maybe<Scalars['String']>;
};

export type Facility = {
  __typename?: 'Facility';
  address: Address;
  created: Scalars['String'];
  economics: EconomicsSummary;
  generationMetaData: GenerationMetaData;
  id: Scalars['ID'];
  location?: Maybe<Location>;
  name: Scalars['String'];
  summary: GenerationSummary;
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
  make?: Maybe<Scalars['String']>;
  max_kW: Scalars['Float'];
  panel_count: Scalars['Int'];
};

export type GenerationSummary = {
  __typename?: 'GenerationSummary';
  day_kWh: Scalars['Float'];
  monthToDate_kWh: Scalars['Float'];
  pastMonthGeneration_kWh: Scalars['Float'];
  pastWeek_kWh: Scalars['Float'];
  pastYearGeneration_kWh: Scalars['Float'];
  performance_ratio: Scalars['Float'];
  totalGeneration_kWh: Scalars['Float'];
  twentyFourHourGeneration_kWh: Scalars['Float'];
  uptime_percentage: Scalars['Float'];
  yearToDate_kWh: Scalars['Float'];
};

export type KbaSession = {
  __typename?: 'KbaSession';
  todo?: Maybe<Scalars['String']>;
};

export type KbaSessionInput = {
  todo?: InputMaybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<Account>;
  createPlaidLinkToken?: Maybe<PlaidLinkToken>;
  createTransfer?: Maybe<Transfer>;
  createUserDwollaAccount: UpdateUserMutationResponse;
  removeAccount?: Maybe<Account>;
  submitIdVerificationDocument: SubmitIdVerifDocMutResp;
  submitKbaSession: SubmitKbaSessionMutResp;
  updateUser: UpdateUserMutationResponse;
};


export type MutationCreateAccountArgs = {
  input?: InputMaybe<CreateAccountInput>;
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
  input?: InputMaybe<KbaSessionInput>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationResponse = {
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

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
  userAccounts?: Maybe<Array<Account>>;
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

export type SubmitKbaSessionMutResp = {
  __typename?: 'SubmitKbaSessionMutResp';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
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
  Unknown = 'UNKNOWN'
}

export enum TransferType {
  Dividend = 'DIVIDEND',
  Investment = 'INVESTMENT',
  Transfer = 'TRANSFER',
  Unknown = 'UNKNOWN'
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
  status?: Maybe<AccountStatus>;
  type?: Maybe<AccountType>;
  valid?: Maybe<Scalars['Boolean']>;
};
