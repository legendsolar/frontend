import {Box} from '@mui/material';
import {themeOptions} from 'app_theme';

const MainContentBox = ({children}) => (
    <Box
        sx={{
            maxWidth: {
                xl: themeOptions.breakpoints.values.xl + 'px',
                lg: themeOptions.breakpoints.values.lg + 'px', // about
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
