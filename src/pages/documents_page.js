import {useRef} from 'react';
import {Paper, Typography, Stack} from '@mui/material';
import SideBarView from 'views/side_bar_view';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import DefaultComponent from 'components/utils/default_component';
import DocumentComponent from 'components/invest/document_component';
import DocumentPlaceholder from 'components/placeholders/document_placeholder';
import {placeholderDocumentPageDocuments} from 'static_data/placeholder_documents';

const DocumentPage = () => {
    const contentRefs = useRef([]);

    const drawerTitles = ['Solar Investment'];

    const documentsEmpty = true;

    const documents = placeholderDocumentPageDocuments;

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
                    {documentsEmpty && (
                        <DocumentPlaceholder></DocumentPlaceholder>
                    )}

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                        disabled={true}
                    >
                        <Typography variant="smallHeadline">
                            Solar Investment Documents
                        </Typography>
                        <DocumentComponent
                            documents={documents}
                        ></DocumentComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarView>
    );
};

export default DocumentPage;
