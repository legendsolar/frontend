import DocumentDataGrid from '../document_data_grid';
import {documents} from 'static_data/placeholder_documents';

const TestTransferDataGrid = () => {
    return (
        <DocumentDataGrid
            documents={documents}
            loading={false}
        ></DocumentDataGrid>
    );
};

export default TestTransferDataGrid;
