import {Transfer, TransferStatus, TransferType} from '@p/schema';

export interface DisplayTransfer {
    title: string;
    destinationName: string;
    sourceName: string;
    statusName: string;
    color: string;
    date: string;
    amount: string;
    type: TransferType;
}
