import {Box} from '@mui/material';
import {themeOptions} from 'app_theme';

const MainContentBox = ({children}) => (
    <Box
        sx={{
            maxWidth: {
                xl: themeOptions.breakpoints.values.xl - 40 + 'px',
                lg: themeOptions.breakpoints.values.lg - 40 + 'px', // about
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
