import {Box} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import Footer from 'components/utils/footer';
import NavBarUserContext from 'components/utils/nav_bar_user_context';

const DefaultView = ({children, navBar}) => {
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
                    backgroundColor: 'whiteHaze.main',
                    zIndex: -2,
                    transform: 'translate3d(0, 0, -10px)',
                }}
            ></Box>
            {navBar}
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
                <Box sx={{minHeight: '100vh'}}>{children}</Box>

                <Footer></Footer>
            </Box>
        </Box>
    );
};

export default DefaultView;
