import {Box, Typography, Stack} from '@mui/material';
import DefaultView from 'views/default_view';
import WomenPanelSVG from 'assets/images/women_panel.svg';
import NavBar from 'components/utils/nav_bar';

const NotFoundPage = ({}) => {
    return (
        <DefaultView navBar={<NavBar></NavBar>}>
            <Box
                sx={{height: '100%', width: '100%', mt: 30}}
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Stack alignItems={'center'}>
                    <img src={WomenPanelSVG}></img>
                    <Typography>This page does not exist</Typography>
                </Stack>
            </Box>
        </DefaultView>
    );
};

export default NotFoundPage;
