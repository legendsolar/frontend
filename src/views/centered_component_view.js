import {Box, Stack, Paper, Grid, Container} from '@mui/material';
import {ErrorBoundary} from '@sentry/react';
import DefaultView from 'views/default_view';

const CenteredComponentView = (props) => {
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
                <ErrorBoundary>
                    <Paper
                        variant="container"
                        sx={{
                            p: 4,
                            width: '400px',
                        }}
                    >
                        {props.children}
                    </Paper>
                </ErrorBoundary>
            </Stack>
        </DefaultView>
    );
};

export default CenteredComponentView;
