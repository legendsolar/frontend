import {Typography, Box, Stack, Button, Link} from '@mui/material';
import {EnvelopeIcon} from 'components/icons/emoji_icons';
import {GoogleIcon} from 'components/icons/icons';
import IconButton from 'components/buttons/icon_button';
import ContentDivider from 'components/basics/content_divider';
import PropTypes from 'prop-types';
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

        <Typography variant={'description'}>
            Legends Solar is currently in closed beta. Please{' '}
            <Typography
                variant={'link'}
                component={Link}
                target={'_blank'}
                sx={{textTransform: 'none'}}
                href={'https://www.legends.solar/get-early-access'}
            >
                join our waitlist
            </Typography>{' '}
            to reserve your place when we launch to the public.
        </Typography>

        {/* <IconButton
            variant="small"
            label="Sign up with Google"
            color="white"
            icon={<GoogleIcon />}
            onClick={onSignUpWithEmail}
        ></IconButton> */}

        <Divider />

        {/* <ContentDivider>
            <Typography variant="label">OR </Typography>
        </ContentDivider> */}

        {/* <IconButton
            variant="small"
            label="Sign up with email"
            color="legendaryGreen"
            icon={<EnvelopeIcon></EnvelopeIcon>}
            onClick={onSignUpWithEmail}
        ></IconButton> */}

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
