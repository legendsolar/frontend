import {Box, Divider} from '@mui/material';
const VertDivider = ({sx}) => {
    return (
        <div>
            <Divider
                orientation="vertical"
                sx={{
                    backgroundColor: 'whiteFog.main',
                    ...sx,
                }}
            ></Divider>
        </div>
    );
};

export default VertDivider;
