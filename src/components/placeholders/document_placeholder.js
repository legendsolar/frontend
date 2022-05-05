import {Typography} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';

const DocumentPlaceholder = () => {
    return (
        <div>
            <DefaultComponent>
                <Typography variant="smallHeadline">
                    You have not purchased any panels yet
                </Typography>
                <Typography variant="headline1">
                    Click to view available panels
                </Typography>
            </DefaultComponent>
        </div>
    );
};

export default DocumentPlaceholder;
