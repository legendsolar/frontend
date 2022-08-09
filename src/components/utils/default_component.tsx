// @ts-nocheck
import {forwardRef, ReactNode} from 'react';
import {Paper, Stack} from '@mui/material';
import {useState} from 'react';
import DefaultErrorBoundary from 'components/errors/default_error_boundary';

interface DefaultComponentProps {
    inactive?: boolean;
    disabled?: boolean;
    paper?: boolean;
    standardWidth?: boolean;
    children?: ReactNode;
    sx?: any;
}

const DefaultComponent = forwardRef(
    (
        {
            inactive = false,
            disabled = false,
            children = {},
            sx = {},
            paper = false,
            standardWidth = true,
        }: DefaultComponentProps,
        ref,
    ) => {
        const opacity = inactive || disabled ? 0.5 : 1;
        const pointerEvents = disabled ? 'none' : 'all';

        const content = (
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
        );

        const maybePaper = paper ? (
            <Paper
                variant={'container' as any}
                sx={
                    {
                        ...sx,
                        pointerEvents: pointerEvents,
                    } as any
                }
                ref={ref}
            >
                {content}
            </Paper>
        ) : (
            content
        );

        if (standardWidth) {
            return <div style={{width: '400px'}}>{maybePaper}</div>;
        } else {
            return maybePaper;
        }
    },
);

export default DefaultComponent;
