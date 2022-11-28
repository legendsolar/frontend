import {Box, Stack, Checkbox, Typography} from '@mui/material';
import React from 'react';

export interface CheckboxItemInterface {
    title: string;
    description: string | JSX.Element;
    checked?: boolean;
    disabled?: boolean;
}

interface CheckboxItemProps extends CheckboxItemInterface {
    onClick(event: React.MouseEvent): void;
    sx?: any;
}

export const CheckboxItem = ({
    checked,
    disabled,
    onClick,
    sx,
    description,
    title,
}: CheckboxItemProps) => {
    return (
        <Box
            sx={{
                ...sx,
                display: 'flex',
            }}
            alignItems="center"
            onClick={(event) => {
                if (!disabled) {
                    onClick(event);
                }
            }}
        >
            <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Checkbox
                    sx={{
                        fontSize: '22px',
                        mt: 'auto',
                        mb: 'auto',
                    }}
                    checked={checked}
                    disabled={disabled}
                ></Checkbox>
                <Stack spacing={0}>
                    <Typography
                        sx={{mt: 1, mb: 1}}
                        variant={'smallLabel' as any}
                    >
                        {title}
                    </Typography>

                    <Typography variant={'description' as any}>
                        {description}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};
