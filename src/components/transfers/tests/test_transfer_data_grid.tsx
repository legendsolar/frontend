import TransferDataGrid from '../transfer_data_grid';
import {testTransfers} from 'static/placeholder_transfers';

const TestTransferDataGrid = () => {
    return (
        <TransferDataGrid
            transfers={testTransfers}
            loading={false}
        ></TransferDataGrid>
    );
};

export default TestTransferDataGrid;
