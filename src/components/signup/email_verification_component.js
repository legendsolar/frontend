import {Grid, Box, TextField, Button, CircularProgress} from '@mui/material';

const EmailVerificationComponent = ({
    onSendVerifyEmail,
    emailSent,
    loading,
}) => {
    return (
        <Box>
            <Button
                variant="primary"
                onClick={onSendVerifyEmail}
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
        </Box>
    );
};

export default EmailVerificationComponent;
