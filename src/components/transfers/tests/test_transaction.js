import TransferComponent from '../transfer_component';

const TestTransactionComponent = () => (
    <TransferComponent
        title="Test Title"
        amount="50.00"
        source="Source Account"
        destination="Destination Account"
        date={new Date()}
        status="Status"
        color="legendaryGreen"
    ></TransferComponent>
);

export default TestTransactionComponent;
