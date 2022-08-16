import {Box} from '@mui/material';

interface DividerProps {
    sx?: any;
}

const Divider = ({sx = {}}: DividerProps) => {
    return (
        <div>
            <Box
                sx={{
                    height: '2px',
                    backgroundColor: 'whiteFog.main',
                    ml: 0,
                    mr: 0,
                    ...sx,
                }}
            ></Box>
        </div>
    );
};

export default Divider;
