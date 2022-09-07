import {Typography, Box, Stack, Button} from '@mui/material';
import {EnvelopeIcon} from 'components/icons/emoji_icons';
import {GoogleIcon} from 'components/icons/icons';
import IconButton from 'components/buttons/icon_button';
import ContentDivider from 'components/basics/content_divider';
import PropTypes from 'prop-types';

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
            icon={<GoogleIcon />}
            onClick={onSignUpWithEmail}
        ></IconButton>

        <ContentDivider>
            <Typography variant="label">OR </Typography>
        </ContentDivider>

        <IconButton
            variant="small"
            label="Sign up with email"
            color="legendaryGreen"
            icon={<EnvelopeIcon></EnvelopeIcon>}
            onClick={onSignUpWithEmail}
        ></IconButton>

        <Stack direction="row" justifyContent={'space-between'}>
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
