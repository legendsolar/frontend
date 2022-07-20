import {Stack, Button, Typography} from '@mui/material/';

const IconButton = ({label, onClick, icon, color, disabled}) => {
    return (
        <Button
            variant="secondary"
            disabled={disabled}
            onClick={onClick}
            sx={{
                backgroundColor: color + '.main',
                color: color + '.contrastText',
            }}
        >
            {icon}
            <Stack
                direction="row"
                alignItems="center"
                sx={{width: '100%', ml: 8}}
            >
                <Typography
                    justifyContent="center"
                    variant="smallLabel"
                    color={color + '.contrastText'}
                >
                    {label}
                </Typography>
            </Stack>
        </Button>
    );
};

export default IconButton;
