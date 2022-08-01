import {forwardRef} from 'react';
import {Paper, Stack} from '@mui/material';
import {useState} from 'react';
import DefaultErrorBoundary from 'components/errors/default_error_boundary';

const DefaultComponent = forwardRef(
    ({inactive, disabled, children, sx}, ref) => {
        const opacity = inactive || disabled ? 0.5 : 1;
        const pointerEvents = disabled ? 'none' : 'all';

        return (
            <Paper
                variant="container"
                sx={{
                    ...sx,
                    pointerEvents: pointerEvents,
                }}
                ref={ref}
            >
                <DefaultErrorBoundary>
                    <Stack
                        sx={{
                            opacity: opacity,
                        }}
                        spacing={4}
                    >
                        {children}
                    </Stack>
                </DefaultErrorBoundary>
            </Paper>
        );
    },
);

export default DefaultComponent;
