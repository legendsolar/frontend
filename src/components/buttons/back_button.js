import {Stack, Button, Typography, Box} from '@mui/material/';
import {ArrowBackIcon} from 'components/icons/icons';

const BackButton = ({label, onClick, disabled}) => {
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
                    variant="monoButton"
                    color={'blackDawn.main'}
                >
                    {label}
                </Typography>
            </Stack>
        </Button>
    );
};

export default BackButton;
