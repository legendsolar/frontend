import {CreateTransferComponent} from '../create_transfer_component';
import {accounts} from './defaults';

export const TestCreateTransfer = () => {
    return (
        <CreateTransferComponent
            accounts={accounts}
            loading={false}
            onComplete={() => alert('onComplete')}
        ></CreateTransferComponent>
    );
};
