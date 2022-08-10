import TransferDataGrid from '../transfer_data_grid';
import {testTransfers} from 'static_data/placeholder_transfers';

const TestTransferDataGrid = () => {
    return (
        <TransferDataGrid
            assetStates={['Barnyard Solar', 'New York Solar']}
            transfers={testTransfers}
        ></TransferDataGrid>
    );
};

export default TestTransferDataGrid;
