import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import {useState} from 'react';
import Component from 'components/basics/component';
import {useLocation, useNavigate} from 'react-router-dom';
import {Typography, Stack, Box} from '@mui/material';
import {ROUTES} from 'routes/routes';

const CreateAccountContent = ({
    onSignUpWithGoogle,
    onSignUpWithEmail,
    onNavigateToSignIn,
    onNavigateToPrivacyPolicy,
    onNavigateToTermsOfService,
}) => {
    return (
        <Component>
            <Stack spacing={16}>
                <SignUpOptionComponent
                    onSignUpWithEmail={onSignUpWithEmail}
                    onSignUpWithGoogle={onSignUpWithGoogle}
                    onNavigateToSignIn={onNavigateToSignIn}
                ></SignUpOptionComponent>

                <Typography variant="description" sx={{pr: 2, pl: 2}}>
                    Signing up for the Legends Solar account means you agree to
                    our
                    <Typography
                        variant="link"
                        onClick={onNavigateToPrivacyPolicy}
                    >
                        {' '}
                        privacy policy
                    </Typography>{' '}
                    and{' '}
                    <Typography
                        variant="link"
                        onClick={onNavigateToTermsOfService}
                    >
                        {' '}
                        terms of service
                    </Typography>
                </Typography>
            </Stack>
        </Component>
    );
};

export default CreateAccountContent;
