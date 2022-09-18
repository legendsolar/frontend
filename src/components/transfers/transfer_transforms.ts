import {format} from 'date-fns';
import {Transfer, TransferStatus, TransferType} from 'schema/schema_gen_types';

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

export const createdDate = (created: Date): string => {
    try {
        return format(created, 'PP');
    } catch {
        const date = new Date(created);
        return format(date, 'PP');
    }
};

const transferTitle = (transfer) => {
    if (transfer.type === 'DIVIDEND') {
        return 'Dividend for ' + transfer.month;
    } else {
        return createdDate(transfer.created);
    }
};

const transferSourceName = (transfer: Transfer): string => {
    if (transfer.type === 'DIVIDEND') {
        if (transfer?.facility?.name) {
            return transfer.facility.name;
        }
    }

    if (transfer.sourceAccount.name) {
        return transfer.sourceAccount.name;
    }

    return 'source';
};

const transferDestinationName = (transfer: Transfer): string => {
    if (transfer?.destinationAccount.name) {
        return transfer.destinationAccount.name;
    } else {
        return 'destination';
    }
};

const transferTypeTransformer = (type: TransferType): string => {
    switch (type) {
        case TransferType.Dividend:
            return 'Dividend Payment';
        case TransferType.Investment:
            return 'Investment';
        case TransferType.Transfer:
            return 'Bank Transfer';
        default:
            return 'Unknown';
    }
};

const transferColorTransformer = (status: TransferStatus): string => {
    switch (status) {
        case TransferStatus.Failed:
            return 'eraserRed';
        case TransferStatus.Cancelled:
            return 'eraserRed';
        case TransferStatus.Pending:
            return 'pencilYellow';
        case TransferStatus.Processed:
            return 'blackDusk';
        default:
            return 'eraserRed';
    }
};

const transferStatusTransformer = (status: TransferStatus): string => {
    switch (status) {
        case TransferStatus.Failed:
            return 'Failed';
        case TransferStatus.Cancelled:
            return 'Cancelled';
        case TransferStatus.Pending:
            return 'Pending';
        case TransferStatus.Processed:
            return 'Complete';
        default:
            return 'Unknown';
    }
};

export const transferTransformer = (transfer: Transfer): DisplayTransfer => {
    return {
        ...transfer,
        title: transferTitle(transfer),
        destinationName: transferDestinationName(transfer),
        sourceName: transferSourceName(transfer),
        statusName: transferStatusTransformer(transfer.status),
        color: transferColorTransformer(transfer.status),
        date: createdDate(new Date(transfer.created)),
    };
};
