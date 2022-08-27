import TransferGrid from '../transfer_grid';
import {testTransfers} from 'static/placeholder_transfers';
import {useState} from 'react';

const TestTransactionComponent = () => {
    const [transfers, setTransfers] = useState<Array<any>>(testTransfers);

    return <TransferGrid transfers={transfers}></TransferGrid>;
};
export default TestTransactionComponent;
