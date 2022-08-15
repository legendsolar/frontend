import {Box} from '@mui/material';

const ContentDivider = ({sx = {}, children, color = 'whiteFog'}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    mr: 2,
                    flex: 1,
                    height: '2px',
                    backgroundColor: color + '.main',
                }}
            ></Box>
            <div>{children}</div>
            <Box
                sx={{
                    ml: 2,
                    flex: 1,
                    height: '2px',
                    backgroundColor: color + '.main',
                }}
            ></Box>
        </div>
    );
};

export default ContentDivider;
