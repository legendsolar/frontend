import Component from 'components/basics/component';
import {Typography, Stack, Box} from '@mui/material';
import SignUpComponent from 'components/signup/sign_up_component';

const AccountCreateInfoContent = ({color, onCreateAccount}) => {
    return (
        <Component
            background={false}
            standardWidth={false}
            sx={{width: '460px'}}
        >
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
