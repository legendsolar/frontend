import {documents} from './defaults';
import DocumentComponent from '../document_component';

const TestDocumentComponent = () => {
    return (
        <DocumentComponent
            documents={documents}
            onDownloadAttempt={(doc) => alert(JSON.stringify(doc))}
        ></DocumentComponent>
    );
};

export default TestDocumentComponent;
