import {Typography, Grid} from '@mui/material';
import DocumentComponent from 'components/invest/document_component';
import DefaultComponent from 'components/utils/default_component';

const DocumentPlaceholder = () => {
    return (
        <div>
            <DefaultComponent>
                <Typography variant="smallHeadline">
                    Purchase panels to view documents
                </Typography>
                <Typography variant="headline1">
                    You don't have any doucments.
                </Typography>
            </DefaultComponent>
        </div>
    );
};

export default DocumentPlaceholder;
