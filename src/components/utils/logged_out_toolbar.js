import {Stack, Button, Typography, useTheme} from '@mui/material';

const LoggedOutToolbar = ({}) => {
    const navigateTo = (url) => {};

    const theme = useTheme();
    return (
        <Stack direction="row" alignItems={'flex-end'}>
            <Button
                variant="header"
                color="dark"
                onClick={() => navigateTo('')}
            >
                <Typography variant="appBarHeader">How it works</Typography>
            </Button>

            <Button
                variant="header"
                color="dark"
                onClick={() => navigateTo('')}
            >
                <Typography variant="appBarHeader">Availability</Typography>
            </Button>

            <Button
                variant="header"
                color="dark"
                onClick={() => navigateTo('')}
            >
                <Typography variant="appBarHeader">About Us</Typography>
            </Button>

            <Button
                variant="header"
                color="dark"
                onClick={() => navigateTo('')}
            >
                <Typography variant="appBarHeader">FAQS</Typography>
            </Button>

            <Button
                variant="header-outlined"
                sx={{
                    color: 'legendaryGreen.main',
                    border: '1px solid ' + theme.palette['legendaryGreen'].main,
                }}
                onClick={() => navigateTo('')}
            >
                <Typography variant="appBarHeader">Login</Typography>
            </Button>

            <Button
                variant="header-filled"
                color="dark"
                onClick={() => navigateTo('')}
            >
                <Typography variant="appBarHeader">Get Started</Typography>
            </Button>
        </Stack>
    );
};

export default LoggedOutToolbar;
