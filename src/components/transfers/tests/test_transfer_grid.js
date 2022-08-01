import TransferGrid from '../transfer_grid';
import {transferPageTransfers} from 'static_data/placeholder_transfers';

const TestTransactionComponent = () => (
    <TransferGrid transfers={transferPageTransfers}></TransferGrid>
);

export default TestTransactionComponent;
