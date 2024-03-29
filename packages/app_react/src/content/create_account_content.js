import {SignUpOptionComponent} from '@project/components/signup/sign_up_option_component';
import {useState} from 'react';
import {Component} from '@project/components/basics/component';
import {useLocation, useNavigate} from 'react-router-dom';
import {Typography, Stack, Box, Link} from '@mui/material';
import {ROUTES} from '../routes/routes';

const CreateAccountContent = ({
    onSignUpWithGoogle,
    onSignUpWithEmail,
    onNavigateToSignIn,
    onNavigateToPrivacyPolicy,
    onNavigateToTermsOfService,
}) => {
    return (
        <Component background={false}>
            <Stack spacing={16}>
                <SignUpOptionComponent
                    onSignUpWithEmail={onSignUpWithEmail}
                    onSignUpWithGoogle={onSignUpWithGoogle}
                    onNavigateToSignIn={onNavigateToSignIn}
                ></SignUpOptionComponent>

                {/* <Typography variant="description">
                    Signing up for an account means you agree to our
                    <Typography
                        variant="link"
                        component={Link}
                        target={'_blank'}
                        href={'https://www.legends.solar/legal/privacy-policy'}
                        // onClick={onNavigateToPrivacyPolicy}
                    >
                        {' '}
                        privacy policy
                    </Typography>{' '}
                    and{' '}
                    <Typography
                        variant="link"
                        component={Link}
                        target={'_blank'}
                        href={
                            'https://www.legends.solar/legal/terms-and-conditions'
                        }
                    >
                        {' '}
                        terms of service
                    </Typography>
                </Typography> */}
            </Stack>
        </Component>
    );
};

export default CreateAccountContent;
