import TransferComponent from '../transfer_component';
import {transferPageTransfers} from 'static/placeholder_transfers';

export const TestTransactionComponent = () => (
    <TransferComponent transfer={transferPageTransfers[0]}></TransferComponent>
);
