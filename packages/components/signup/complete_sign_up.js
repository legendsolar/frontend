import {Stack, Typography, Button} from '@mui/material';

export const CompleteSignUp = ({onComplete}) => {
    return (
        <Stack spacing={6}>
            <Typography variant="headline1">
                {`Now it's time to explore solar investments.`}
            </Typography>

            <Typography variant="smallHeadline">
                Your account has been created and you are now able to invest in
                panels on Legends Solar.
            </Typography>

            <Button
                variant="primary"
                onClick={() => {
                    onComplete();
                }}
            >
                Continue
            </Button>
        </Stack>
    );
};
