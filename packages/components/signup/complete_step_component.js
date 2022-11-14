import {Typography, Stack, Button} from '@mui/material';
import React from 'react';

export const CompleteStepComponent = ({
    complete,
    title,
    icon,
    onClick,
    disabled,
    disabledMessage,
    completeMessage,
}) => {
    const message = (complete, disabled) => {
        if (disabled) {
            return disabledMessage;
        }

        return complete ? completeMessage : 'Get Started';
    };

    return (
        <Button
            onClick={onClick}
            variant={'flat'}
            color={'light'}
            disabled={disabled || complete}
        >
            <Stack sx={{width: '100%'}} alignItems={'flex-start'}>
                <Stack
                    sx={{width: '100%'}}
                    direction="row"
                    justifyContent={'space-between'}
                >
                    {icon}{' '}
                    {
                        <Typography variant="monoButton">
                            {message(complete, disabled)}
                        </Typography>
                    }
                </Stack>
                <Typography variant="subtitle1">{title}</Typography>
            </Stack>
        </Button>
    );
};
