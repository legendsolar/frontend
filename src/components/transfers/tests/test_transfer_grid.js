import TransferGrid from '../transfer_grid';
import {testTransfers} from 'static_data/placeholder_transfers';

const TestTransactionComponent = () => (
    <TransferGrid transfers={testTransfers}></TransferGrid>
);

export default TestTransactionComponent;
