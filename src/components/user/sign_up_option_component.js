import {Typography, Box, Stack, Button} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '../../components/buttons/google_icon_button';
import ContentDivider from '../../components/basics/content_divider';
import GoogleLogo from '../../components/icons/google_logo';
import PropTypes from 'prop-types';

const SignUpOptionComponent = ({
    onSignUpWithGoogle,
    onSignUpWithEmail,
    onNavigateToSignIn,
}) => (
    <Box>
        <Stack spacing={4}>
            <Typography variant="subtitle1">Create Account</Typography>
            <IconButton
                label="Sign up with Google"
                color="whiteHaze"
                icon={<GoogleLogo height={'64px'}></GoogleLogo>}
                onClick={onSignUpWithGoogle}
            ></IconButton>
            <ContentDivider>
                <Typography align="center" variant="smallLabel">
                    or
                </Typography>
            </ContentDivider>

            <IconButton
                label="Sign up with email"
                color="legendaryGreen"
                icon={<EmailIcon sx={{ml: 3, fontSize: '18px'}}></EmailIcon>}
                onClick={onSignUpWithEmail}
            ></IconButton>

            <Stack direction="row" justifyContent={'flex-end'}>
                <Button variant="text" onClick={onNavigateToSignIn}>
                    <Typography variant="smallLabel">
                        {'Have an account? '}
                    </Typography>
                    <Typography
                        variant="smallLabel"
                        color="grassGreen.main"
                        sx={{ml: 1}}
                    >
                        {' Login'}
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    </Box>
);

SignUpOptionComponent.propTypes = {
    onSignUpWithGoogle: PropTypes.func.isRequired,
    onSignUpWithEmail: PropTypes.func.isRequired,
    onNavigateToSignIn: PropTypes.func.isRequired,
};

export default SignUpOptionComponent;
