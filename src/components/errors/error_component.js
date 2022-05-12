import {Typography, Stack, Paper} from '@mui/material';
import PropTypes from 'prop-types';

const ErrorComponent = ({}) => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{height: '100%'}}
        >
            <Typography variant="headline1">🤖</Typography>
            <Typography>Oops... an error occured</Typography>
        </Stack>
    );
};

export default ErrorComponent;
