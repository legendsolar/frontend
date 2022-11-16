import {Stack, Button, Typography, Box} from '@mui/material/';
import {ArrowBackIcon} from '../icons/icons';

interface BackButtonProps {
    label?: string;
    onClick?(): any;
    disabled?: boolean;
    linkText?: string;
}

export const BackButton = ({
    label = 'Back',
    onClick = () => {},
    disabled = false,
    linkText = '',
}: BackButtonProps) => {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            sx={{}}
            href={linkText}
            // target="_blank"
        >
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ArrowBackIcon
                    sx={{width: '10px', height: '10px'}}
                ></ArrowBackIcon>
                <Typography
                    justifyContent="center"
                    variant={'monoButton' as any}
                    color={'blackDawn.main' as any}
                >
                    {label}
                </Typography>
            </Stack>
        </Button>
    );
};
