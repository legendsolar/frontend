import {Typography, Grid} from '@mui/material';
import DocumentComponent from 'components/invest/document_component';
import Component from 'components/basics/component';

const DocumentPlaceholder = () => {
    return (
        <div>
            <Component>
                <Typography variant="smallHeadline">
                    Purchase panels to view documents
                </Typography>
                <Typography variant="headline1">
                    You don't have any doucments.
                </Typography>
            </Component>
        </div>
    );
};

export default DocumentPlaceholder;
