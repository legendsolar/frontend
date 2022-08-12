import {Stack, Button, Typography, Box} from '@mui/material/';
import {ArrowBackIcon} from 'components/icons/icons';

interface BackButtonProps {
    label?: string;
    onClick(): any;
    disabled?: boolean;
}

const BackButton = ({
    label = 'Back',
    onClick,
    disabled = false,
}: BackButtonProps) => {
    return (
        <Button disabled={disabled} onClick={onClick} sx={{}}>
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

export default BackButton;
