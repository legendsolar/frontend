import {useEffect, useRef, useState} from 'react';
import {Paper, Typography, Stack} from '@mui/material';
import SideBarView from 'views/side_bar_view';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import DefaultComponent from 'components/utils/default_component';
import DocumentComponent from 'components/invest/document_component';
import DocumentPlaceholder from 'components/placeholders/document_placeholder';
import {useStorage} from 'hooks/use_storage';
import {placeholderDocumentPageDocuments} from 'static_data/placeholder_documents';
import {useFirebaseApp} from 'reactfire';

const transformDocument = (storageDocument) => {
    return {
        title: storageDocument?.metadata?.customMetadata?.displayName
            ? storageDocument?.metadata?.customMetadata?.displayName
            : 'Document',
        color: 'legendaryGreen',
        link: storageDocument?.link,
    };
};

const DocumentPage = () => {
    const contentRefs = useRef([]);

    const drawerTitles = ['Solar Investment'];

    const [documents, setDocuments] = useState([]);

    const {getUserFilesWithMetaData} = useStorage();

    useEffect(async () => {
        const docs = await getUserFilesWithMetaData();
        setDocuments(docs);
    }, []);

    const displayDocuments =
        documents.length > 0
            ? documents.map(transformDocument)
            : placeholderDocumentPageDocuments;

    const documentsEmpty = documents.length > 0;

    return (
        <SideBarView
            drawer={
                <ScrollToSidebar
                    header={
                        <Typography variant="smallHeadline">
                            Documents
                        </Typography>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={6}>
                    {!documentsEmpty && (
                        <DocumentPlaceholder></DocumentPlaceholder>
                    )}

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                        disabled={!documentsEmpty}
                    >
                        <Typography variant="smallHeadline">
                            Solar Investment Documents
                        </Typography>
                        <DocumentComponent
                            documents={displayDocuments}
                        ></DocumentComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarView>
    );
};

export default DocumentPage;
