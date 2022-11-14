import {Address} from 'schema/schema_gen_types';

export const formatAddress = (address: Address): string => {
    return `${address?.streetAddress} ${address?.city}, ${address?.state} ${address.postalCode}`;
};

export const formatAddressLine = (address: Address): string => {
    return `${address?.streetAddress} | ${address?.city}, ${address?.state} ${address.postalCode}`;
};
