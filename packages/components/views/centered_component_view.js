import {Box, Stack, Paper, Grid, Container} from '@mui/material';
import {ErrorBoundary} from '@sentry/react';
import {Component} from '../basics/component';
import DefaultView from './default_view';

const CenteredComponentView = (props) => {
    return (
        <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                width: '100%',
                minHeight: '70vh',
                zIndex: 4,
            }}
        >
            <Component>{props.children}</Component>
        </Stack>
    );
};

export default CenteredComponentView;
