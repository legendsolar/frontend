import TransferGrid from '../transfer_grid';
import {testTransfers} from 'static/placeholder_transfers';
import {useState} from 'react';
import {Transfer} from 'schema/schema_gen_types';

const TestTransactionComponent = () => {
    return (
        <TransferGrid
            transfers={testTransfers as Array<Transfer>}
            loading={false}
        ></TransferGrid>
    );
};
export default TestTransactionComponent;
