import {Typography, Stack, Paper} from '@mui/material';

const ErrorComponent = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{height: '100%'}}
        >
            <Typography variant={'headline1' as any}>🤖</Typography>
            <Typography>Oops... an error occured</Typography>
        </Stack>
    );
};

export default ErrorComponent;
