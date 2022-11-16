import {Stack, Button, Typography, useTheme} from '@mui/material';

export const LoggedOutToolbar = ({}) => {
    const navigateTo = (url) => {};

    const theme = useTheme();
    return (
        <Stack direction="row" alignItems={'flex-end'}>
            <Button
                variant="header"
                color="dark"
                href={'https://www.legends.solar/how-it-works'}
            >
                <Typography variant="appBarHeader">How it works</Typography>
            </Button>

            <Button
                variant="header"
                color="dark"
                href={'https://www.legends.solar/legal/privacy-policy'}
                disabled={true}
            >
                <Typography variant="appBarHeader">Availability</Typography>
            </Button>

            <Button
                variant="header"
                color="dark"
                href={'https://www.legends.solar/about-us'}
            >
                <Typography variant="appBarHeader">About Us</Typography>
            </Button>

            <Button
                variant="header"
                color="dark"
                href={'https://www.legends.solar/faqs'}
            >
                <Typography variant="appBarHeader">FAQS</Typography>
            </Button>

            <Button
                variant="header-outlined"
                sx={{
                    color: 'legendaryGreen.main',
                    border: '1px solid ' + theme.palette['legendaryGreen'].main,
                }}
                onClick={() => navigateTo('/signin')}
            >
                <Typography variant="appBarHeader">Login</Typography>
            </Button>

            <Button
                variant="header-filled"
                color="dark"
                onClick={() => navigateTo('/signin')}
            >
                <Typography variant="appBarHeader">Get Started</Typography>
            </Button>
        </Stack>
    );
};
