import {Box, Stack, Paper, Grid, Container} from '@mui/material';
import {ErrorBoundary} from '@sentry/react';
import DefaultView from 'views/default_view';

const FullPageComponentView = (props) => {
    return (
        <DefaultView>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                sx={{
                    width: '100%',
                    minHeight: '70vh',
                    zIndex: 4,
                }}
            >
                <ErrorBoundary>{props.children}</ErrorBoundary>
            </Stack>
        </DefaultView>
    );
};

export default FullPageComponentView;
