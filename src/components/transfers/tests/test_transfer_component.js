import TransferComponent from '../transfer_component';
import {transferPageTransfers} from 'static_data/placeholder_transfers';

const TestTransactionComponent = () => (
    <TransferComponent transfer={transferPageTransfers[0]}></TransferComponent>
);

export default TestTransactionComponent;