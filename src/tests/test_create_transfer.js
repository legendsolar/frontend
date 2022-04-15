import CreateTransferComponent from '../components/transfers/create_transfer_component';
import {accounts} from './test_data';

const TestCreateTransfer = () => {
    return (
        <CreateTransferComponent
            accounts={accounts}
            loading={false}
            onComplete={() => alert('onComplete')}
        ></CreateTransferComponent>
    );
};

export default TestCreateTransfer;
