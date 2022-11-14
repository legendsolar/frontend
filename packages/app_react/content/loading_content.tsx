import {Box} from '@mui/material';
import LoadingComponent from '../basics/loading_component';

const LoadingContent = ({sx = {}}) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '60vh',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                ...sx,
            }}
        >
            <LoadingComponent></LoadingComponent>
        </Box>
    );
};

export default LoadingContent;
