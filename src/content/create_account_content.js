import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import {useState} from 'react';
import DefaultComponent from 'components/utils/default_component';
import {useLocation, useNavigate} from 'react-router-dom';

import {Typography, Stack, Box} from '@mui/material';
import {routes} from 'routes/app_router';

const CreateAccountContent = ({onSignUpWithGoogle, onSignUpWithEmail}) => {
    const navigate = useNavigate();
    return (
        <DefaultComponent>
            <Stack spacing={16}>
                <SignUpOptionComponent
                    onSignUpWithEmail={onSignUpWithEmail}
                    onSignUpWithGoogle={onSignUpWithGoogle}
                    onNavigateToSignIn={() => navigate(routes.SIGN_IN)}
                ></SignUpOptionComponent>

                <Typography variant="description" sx={{pr: 2, pl: 2}}>
                    Signing up for the Legends Solar account means you agree to
                    the
                    <Typography
                        variant="link"
                        onClick={() => navigate(routes.PRIVACY_POLICY)}
                    >
                        {' '}
                        privacy policy
                    </Typography>{' '}
                    and{' '}
                    <Typography
                        variant="link"
                        onClick={() => navigate(routes.TERMS_AND_CONDITIONS)}
                    >
                        {' '}
                        terms of service
                    </Typography>
                </Typography>
            </Stack>
        </DefaultComponent>
    );
};

export default CreateAccountContent;
