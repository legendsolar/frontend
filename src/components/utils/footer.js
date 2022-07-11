import {Grid, Typography, Box, Stack, Button} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';
import LassorImg from 'assets/Lassor.png';
import NeraImg from 'assets/Nera.png';

const Footer = () => {
    return (
        <Box sx={{mt: 10}}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Stack>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} lg={3}>
                                <Stack>
                                    <Typography variant="smallHeadline">
                                        Company
                                    </Typography>

                                    <Button
                                        href={'https://www.legends.solar/'}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Home
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.legends.solar/about-legends'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            About us
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.legends.solar/the-team'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            The team
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={3}>
                                <Stack>
                                    <Button
                                        href={
                                            'https://www.legends.solar/reserve-panels'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="smallHeadline">
                                            Learn
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.legends.solar/how-it-works'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            How it works
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={'https://www.legends.solar/faqs'}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            FAQs
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.legends.solar/news-room'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            News Room
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={3}>
                                <Stack>
                                    <Typography variant="smallHeadline">
                                        Connect
                                    </Typography>

                                    <Button
                                        href={
                                            'https://twitter.com/legends_solar'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Twitter
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.instagram.com/legends.solar/'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Instagram
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.linkedin.com/company/legendssolar/'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            LinkedIn
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={6} lg={3}>
                                <Stack>
                                    <Typography variant="smallHeadline">
                                        Legal
                                    </Typography>

                                    <Button
                                        href={
                                            'https://www.legends.solar/legal/privacy-policy'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Privacy Policy
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.legends.solar/legal/terms-and-conditions'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Terms & Conditions
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            'https://www.legends.solar/legal/legal'
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Disclaimer
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack>
                        <Stack>
                            <Typography
                                sx={{
                                    fontSize: '30px',
                                    fontWeight: '300',
                                    lineHeight: '38px',
                                }}
                            >
                                Designed by Legends
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    lineHeight: '25px',
                                }}
                            >
                                in Brooklyn, New York
                            </Typography>
                        </Stack>

                        <Typography
                            variant="subtitle1"
                            sx={{mt: 4, fontWeight: '700'}}
                        >
                            Legends Incorporated
                        </Typography>
                        <Typography variant="label">
                            134 North 4th Street Brooklyn, NY 11249
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>

            <div style={{height: '100px'}}></div>
        </Box>
    );
};

export default Footer;
