import {Typography, Stack, Button} from '@mui/material';
import Component from 'components/basics/component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageinatedComponent = ({children, title, onBack, backDisabled}) => {
    return (
        <Component>
            <Stack direction="row" alignItems="center">
                <Typography variant="smallHeadline">{title}</Typography>
            </Stack>

            {children}
        </Component>
    );
};

export default PageinatedComponent;
