import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import {useState} from 'react';
import Component from 'components/basics/component';
import {useLocation, useNavigate} from 'react-router-dom';

import {Typography, Stack, Box} from '@mui/material';
import {ROUTES} from 'routes/routes';
import SignUpComponent from 'components/signup/sign_up_component';

const AccountCreateInfoContent = ({color, onCreateAccount}) => {
    return (
        <Component background={false}>
            <Stack spacing={4}>
                <Typography variant="smallHeadline">Create Account</Typography>
                <SignUpComponent
                    color={color}
                    onSubmit={onCreateAccount}
                ></SignUpComponent>
            </Stack>
        </Component>
    );
};

export default AccountCreateInfoContent;
