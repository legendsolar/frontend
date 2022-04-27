import {useRef} from 'react';
import {Paper, Typography, Stack} from '@mui/material';
import SideBarView from 'views/side_bar_view';
import ScrollToSidebar from 'components/utils/scroll_to_sidebar';
import DefaultComponent from 'components/utils/default_component';
import DocumentComponent from 'components/invest/document_component';

const DocumentPage = () => {
    const contentRefs = useRef([]);

    const drawerTitles = [
        'Financial Documents',
        'Tax Documents',
        'Purchase Agreements',
    ];

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
                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Financial Documents
                        </Typography>
                        <DocumentComponent
                            documents={[
                                {
                                    title: 'All Transactions',
                                },
                                {
                                    title: 'Purchase Agreement',
                                },
                                {
                                    title: 'Billing Agreement',
                                },
                            ]}
                        ></DocumentComponent>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Tax Documents
                        </Typography>
                        <DocumentComponent
                            documents={[
                                {
                                    title: 'All Transactions',
                                },
                                {
                                    title: 'Purchase Agreement',
                                },
                                {
                                    title: 'Billing Agreement',
                                },
                            ]}
                        ></DocumentComponent>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Purchase Agreements
                        </Typography>
                        <DocumentComponent
                            documents={[
                                {
                                    title: 'All Transactions',
                                },
                                {
                                    title: 'Purchase Agreement',
                                },
                                {
                                    title: 'Billing Agreement',
                                },
                            ]}
                        ></DocumentComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarView>
    );
};

export default DocumentPage;
