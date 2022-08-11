import TransferDataGrid from '../transfer_data_grid';
import {testTransfers} from 'static_data/placeholder_transfers';

const TestTransferDataGrid = () => {
    return (
        <TransferDataGrid
            transfers={testTransfers}
            loading={false}
        ></TransferDataGrid>
    );
};

export default TestTransferDataGrid;
