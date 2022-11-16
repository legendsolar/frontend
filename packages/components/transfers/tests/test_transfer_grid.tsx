import {TransferGrid} from '../transfer_grid';
import {testDisplayTransfers} from 'static/placeholder_transfers';
import {useState} from 'react';
import {Transfer} from '@p/schema';

export const TestTransactionComponent = () => {
    return (
        <TransferGrid
            transfers={testDisplayTransfers}
            loading={false}
        ></TransferGrid>
    );
};
