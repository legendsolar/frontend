import {Box} from '@mui/material';
import {themeOptions} from 'app_theme';

export const fromViewportPadding = () => {
    return {
        xs: `calc((100vw - ${themeOptions.breakpoints.values.xs}px-20px) / 2)`,
        sm: `calc((100vw - ${themeOptions.breakpoints.values.sm}px-20px) / 2)`,
        md: `calc((100vw - ${themeOptions.breakpoints.values.md}px) / 2)`,
        lg: `calc((100vw - ${themeOptions.breakpoints.values.lg}px) / 2)`,
        xl: `calc((100vw - ${themeOptions.breakpoints.values.xl}px) / 2)`,
    };
};

const MainContentBox = ({children, passedRef = null}) => (
    <Box
        sx={{
            maxWidth: {
                md: themeOptions.breakpoints.values.md + 'px',
                lg: themeOptions.breakpoints.values.lg + 'px', // about
                xl: themeOptions.breakpoints.values.xl + 'px',
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
        <div ref={passedRef} style={{width: '100%', height: '1005'}}>
            {children}
        </div>
    </Box>
);
export default MainContentBox;
