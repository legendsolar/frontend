import {Typography, Box, Stack, Button} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from 'components/buttons/icon_button';
import ContentDivider from 'components/basics/content_divider';
import GoogleLogo from 'components/icons/google_logo';
import PropTypes from 'prop-types';
import DefaultComponent from 'components/utils/default_component';
import Divider from 'components/basics/divider';

const SignUpOptionComponent = ({
    onSignUpWithGoogle,
    onSignUpWithEmail,
    onNavigateToSignIn,
}) => (
    <Stack spacing={4}>
        <Typography variant="smallHeadline" sx={{mb: 6}}>
            Create Account
        </Typography>

        <IconButton
            variant="small"
            label="Sign up with Google"
            color="white"
            icon={<GoogleLogo height={'64px'}></GoogleLogo>}
            onClick={onSignUpWithEmail}
        ></IconButton>

        <ContentDivider>
            <Typography variant="label">OR </Typography>
        </ContentDivider>

        <IconButton
            variant="small"
            label="Sign up with email"
            color="legendaryGreen"
            icon={<EmailIcon sx={{ml: 3, fontSize: '24px'}}></EmailIcon>}
            onClick={onSignUpWithEmail}
        ></IconButton>

        <Stack
            direction="row"
            justifyContent={'space-between'}
            sx={{pl: 2, pr: 2}}
        >
            <Typography variant="smallLabel">
                {'Already have an account?'}
            </Typography>
            <Button variant="text" onClick={onNavigateToSignIn}>
                <Typography
                    variant="smallLabel"
                    color="legendaryGreen.main"
                    sx={{ml: 1}}
                >
                    {' Login'}
                </Typography>
            </Button>
        </Stack>
    </Stack>
);

SignUpOptionComponent.propTypes = {
    onSignUpWithGoogle: PropTypes.func.isRequired,
    onSignUpWithEmail: PropTypes.func.isRequired,
    onNavigateToSignIn: PropTypes.func.isRequired,
};

export default SignUpOptionComponent;
