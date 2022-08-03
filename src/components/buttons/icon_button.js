import {Stack, Button, Typography, Box} from '@mui/material/';

const IconButton = ({label, onClick, icon, color, disabled, variant}) => {
    return (
        <Button
            variant={variant}
            disabled={disabled}
            onClick={onClick}
            sx={{
                backgroundColor: color + '.main',
                color: color + '.contrastText',
                justifyContent: 'flex-start',
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
                        variant="monoButton"
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
