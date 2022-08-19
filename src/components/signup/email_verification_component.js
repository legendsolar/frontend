import {Box, Alert, Stack, Typography, Collapse} from '@mui/material';
import {useEffect, useState} from 'react';
import {ErrorTypes} from 'utils/errors';

const EmailVerificationComponent = ({onSendVerifyEmail, loading}) => {
    const [error, setError] = useState(null);
    const [emailSent, setEmailSent] = useState(false);

    const sendVerifyEmail = () => {
        onSendVerifyEmail()
            .then(() => setEmailSent(true))
            .catch((error) => {
                if (error.type === ErrorTypes.SystemError) {
                    setError(error.message);
                }
            });
    };

    useEffect(() => {
        sendVerifyEmail();
    }, []);

    return (
        <Box>
            <Stack>
                <Typography varient={'smallLabel'}>
                    We'll need to verify your email address before we can
                    continue.
                </Typography>
                <Typography varient={'smallLabel'}>
                    Check your email for a message from us to confirm your
                    account.
                </Typography>
                <Collapse in={!!error}>
                    <Alert severity="error">{error}</Alert>
                </Collapse>

                <Collapse in={emailSent}>
                    <Alert severity="info">Email sent!</Alert>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default EmailVerificationComponent;
