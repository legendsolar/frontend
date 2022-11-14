import TransferGrid from '../transfer_grid';
import {testDisplayTransfers} from 'static/placeholder_transfers';
import {useState} from 'react';
import {Transfer} from 'schema/schema_gen_types';

export const TestTransactionComponent = () => {
    return (
        <TransferGrid
            transfers={testDisplayTransfers}
            loading={false}
        ></TransferGrid>
    );
};
