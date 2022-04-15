import {
    Box,
    Stack,
    Paper,
    Grid,
    Container,
    CircularProgress,
} from '@mui/material';
import DefaultView from './default_view';

const LoadingView = () => {
    return (
        <DefaultView>
            <Box
                sx={{
                    height: '80vh',
                    display: 'flex',
                }}
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        </DefaultView>
    );
};

export default LoadingView;
