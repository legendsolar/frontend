import {Box, Stack, Paper, Grid, Container} from '@mui/material';
import Footer from 'components/utils/footer';

const FullPageView = ({children, authenticated, navBar}) => {
    return (
        <Box
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            sx={{
                transform: 'translate3d(0, 0, 0)',
            }}
        >
            <Box
                position="fixed"
                top={0}
                bottom={0}
                left={0}
                right={0}
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white.main',
                    zIndex: -2,
                    transform: 'translate3d(0, 0, -10px)',
                }}
            ></Box>
            {navBar}
            <Box sx={{minHeight: '100vh'}}>{children}</Box>

            <Footer></Footer>
        </Box>
    );
};

export default FullPageView;
