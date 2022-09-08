import {Divider} from '@mui/material';

const VertDivider = ({sx}: {sx: any}) => {
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
