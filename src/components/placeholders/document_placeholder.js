import {Typography, Grid} from '@mui/material';
import DocumentComponent from 'components/invest/document_component';
import DefaultComponent from 'components/utils/default_component';

const DocumentPlaceholder = () => {
    return (
        <div>
            <Grid container spacing={4} sx={{width: '100%'}}>
                <Grid item xs={12}>
                    <DefaultComponent>
                        <Typography variant="smallHeadline">
                            Purchase panels to view documents
                        </Typography>
                        <Typography variant="headline1">
                            You don't have any doucments.
                        </Typography>
                    </DefaultComponent>
                </Grid>

                <Grid item xs={12}>
                    <DefaultComponent disabled={true}>
                        <Typography variant="smallHeadline">
                            Solar Investments
                        </Typography>
                        <DocumentComponent
                            documents={[
                                {
                                    title: 'Test Document 1',
                                    color: 'legendaryGreen',
                                },
                                {
                                    title: 'Test Document 2',
                                    color: 'skyBlue',
                                },
                                {
                                    title: 'Test Document 3',
                                    color: 'pencilYellow',
                                },
                            ]}
                            onDownloadAttempt={() => {}}
                        ></DocumentComponent>
                    </DefaultComponent>
                </Grid>
            </Grid>
        </div>
    );
};

export default DocumentPlaceholder;
