import {Box, Stack, Paper, Grid, Container} from '@mui/material';
import NavBar from '../components/utils/nav_bar';
import {useAuth} from '../hooks/use_auth';
import Footer from '../components/utils/footer';

const DefaultView = (props) => {
    const auth = useAuth();
    // const backgroundColor = !!auth?.user ? "blackDusk.main" : "blackDawn.main";
    const backgroundColor = 'blackDusk.main';
    const headerHeight = '300px';

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
                position="absolute"
                sx={{
                    height: headerHeight,
                    width: '100%',
                    backgroundColor: backgroundColor,
                    zIndex: -1,
                    transform: 'translate3d(0, 0, -5px)',
                }}
            ></Box>
            <Box
                position="fixed"
                top={0}
                bottom={0}
                left={0}
                right={0}
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'whiteHaze.main',
                    zIndex: -2,
                    transform: 'translate3d(0, 0, -10px)',
                }}
            ></Box>
            <NavBar></NavBar>
            <Box
                sx={{
                    maxWidth: '1275px',
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
                    mt: 16,
                }}
            >
                {props.children}

                <Footer></Footer>
            </Box>
        </Box>
    );
};

export default DefaultView;
