import {Typography, Stack, Button} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageinatedComponent = ({children, title, onBack, backDisabled}) => {
    return (
        <DefaultComponent>
            <Stack direction="row" alignItems="center">
                <Typography variant="smallHeadline">{title}</Typography>
            </Stack>

            {children}
        </DefaultComponent>
    );
};

export default PageinatedComponent;
