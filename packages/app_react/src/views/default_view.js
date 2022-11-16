import {Box} from '@mui/material';
import {useAuth} from '@project/hooks/use_auth';
import {Footer} from '@project/components/footer';
import {MainContentBox} from '@project/components/basics';

const DefaultView = ({
    children,
    navBar,
    backgroundColor = 'whiteHaze.main',
}) => {
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
                    backgroundColor: backgroundColor,
                    zIndex: -2,
                    transform: 'translate3d(0, 0, -10px)',
                }}
            ></Box>

            <Box
                position="absolute"
                sx={{
                    height: '300px',
                    width: '100%',
                    backgroundColor: 'whiteFog.main',
                    zIndex: -1,
                    transform: 'translate3d(0, 0, -5px)',
                }}
            ></Box>
            <MainContentBox>
                {navBar}
                <Box sx={{minHeight: '100vh'}}>{children}</Box>

                <Footer></Footer>
            </MainContentBox>
        </Box>
    );
};

export default DefaultView;
