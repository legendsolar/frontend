import {documents} from '../../invest/tests/defaults';
import DocumentListComponent from '../document_list_component';

const TestDocumentComponent = () => {
    return (
        <DocumentListComponent
            documents={documents}
            onDownloadAttempt={(doc) => alert(JSON.stringify(doc))}
        ></DocumentListComponent>
    );
};

export default TestDocumentComponent;
