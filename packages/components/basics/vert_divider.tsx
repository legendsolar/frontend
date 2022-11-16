import {Divider} from '@mui/material';

export const VertDivider = ({sx = {}}: {sx?: any}) => {
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
