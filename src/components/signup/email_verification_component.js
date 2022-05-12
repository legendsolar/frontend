import {
    Grid,
    Box,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Stack,
    Typography,
    Collapse,
} from '@mui/material';
import {useState} from 'react';
import {authErrorTranslator} from 'utils/auth_error_translator';
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

    return (
        <Box>
            <Stack>
                <Typography varient={'smallLabel'}>
                    We'll need to verify your email address before we can
                    continue.
                </Typography>
                <Button
                    variant="primary"
                    onClick={sendVerifyEmail}
                    disabled={emailSent}
                    color="legendaryGreen"
                    sx={{width: '100%', mt: 4}}
                >
                    {loading ? (
                        <CircularProgress color="light"></CircularProgress>
                    ) : (
                        'Send verification email'
                    )}
                </Button>
                <Collapse in={!!error}>
                    <Alert severity="error">{error}</Alert>
                </Collapse>

                <Collapse in={emailSent}>
                    <Alert severity="info">Check your email!</Alert>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default EmailVerificationComponent;
