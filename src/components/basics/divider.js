import {Box} from '@mui/material';
const Divider = ({sx}) => {
    return (
        <div>
            <Box
                sx={{
                    height: '2px',
                    backgroundColor: 'whiteFog.main',
                    ml: -4,
                    mr: -4,
                    ...sx,
                }}
            ></Box>
        </div>
    );
};

export default Divider;
