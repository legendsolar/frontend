import {documents} from 'static/placeholder_documents';
import DocumentListComponent from '../document_list_component';

const TestDocumentComponent = () => {
    return (
        <DocumentListComponent documents={documents}></DocumentListComponent>
    );
};

export default TestDocumentComponent;
