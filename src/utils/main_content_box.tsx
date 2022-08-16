import {Box} from '@mui/material';
import {themeOptions} from 'app_theme';

const MainContentBox = ({children}) => (
    <Box
        sx={{
            maxWidth: {
                xl: '1320px',
                lg: themeOptions.breakpoints.lg - 70 + 'px', // about
                md: themeOptions.breakpoints.md - 70 + 'px',
            },
            pl: {
                sm: '10px',
                md: '10px',
                lg: '20px',
                xl: '20px',
            },
            pr: {
                sm: '10px',
                md: '10px',
                lg: '20px',
                xl: '20px',
            },
            mr: 'auto',
            ml: 'auto',
        }}
    >
        {children}
    </Box>
);
export default MainContentBox;
