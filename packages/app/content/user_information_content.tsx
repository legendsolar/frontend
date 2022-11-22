import {Typography, Box} from '@mui/material';
import {Component} from '@project/components/basics/component';
import {UserInformationComponent} from '@project/components/signup/user_information_component';

interface Values {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
}

interface Props {
    onSubmit(values: Values): void;
    loading: boolean;
    error: string | undefined;
    color?: 'dark' | 'light';
}

const UserInformationContent = ({
    onSubmit,
    loading,
    error,
    color = 'dark',
}: Props) => {
    return (
        <Component sx={{background: 'none'}}>
            <Typography variant={'smallHeadline' as any}>
                Complete Information
            </Typography>

            <Typography variant={'body2' as any}>
                {'You will '}
                <Box fontWeight="bold" display="inline">
                    {'have to log in again '}
                </Box>
                {'after creating your password'}
            </Typography>

            <UserInformationComponent
                color={color}
                onSubmit={onSubmit}
                loading={loading}
                error={error}
            ></UserInformationComponent>
        </Component>
    );
};

export default UserInformationContent;
