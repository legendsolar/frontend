import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import {useState} from 'react';
import DefaultComponent from 'components/utils/default_component';
import {useLocation, useNavigate} from 'react-router-dom';

import {Typography, Stack, Box} from '@mui/material';
import {routes} from 'routes/app_router';
import SignUpComponent from 'components/signup/sign_up_component';

const AccountCreateInfoContent = () => {
    return (
        <DefaultComponent>
            <Stack spacing={4}>
                <Typography variant="smallHeadline">Create Account</Typography>
                <SignUpComponent></SignUpComponent>
            </Stack>
        </DefaultComponent>
    );
};

export default AccountCreateInfoContent;
