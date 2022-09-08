import {Stack, Button, Typography, Box} from '@mui/material/';
import {boolean} from 'yup';

interface IconButtonProps {
    label: string;
    onClick(): void;
    icon: JSX.Element;
    color: string;
    disabled: boolean;
    variant: string;
}

const IconButton = ({
    label,
    onClick,
    icon,
    color,
    disabled,
    variant,
}: IconButtonProps) => {
    return (
        <Button
            variant={variant as any}
            disabled={disabled}
            onClick={onClick}
            sx={{
                backgroundColor: color + '.main',
                color: color + '.contrastText',
                justifyContent: 'flex-start',
                ':hover': {
                    backgroundColor: color + '.main',
                },
            }}
        >
            {icon}
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Box
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                >
                    <Typography
                        justifyContent="center"
                        variant={'monoButton' as any}
                        color={color + '.contrastText'}
                    >
                        {label}
                    </Typography>
                </Box>
            </Stack>
        </Button>
    );
};

export default IconButton;
