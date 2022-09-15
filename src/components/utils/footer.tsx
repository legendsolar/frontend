import {Grid, Typography, Box, Stack, Button} from '@mui/material';
import Component from 'components/basics/component';
import LassorImg from 'assets/Lassor.png';
import NeraImg from 'assets/Nera.png';
import {EXTERNAL_LINKS} from 'webflow/webflowLinking';

const Footer = () => {
    return (
        <Box sx={{mt: 10}}>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Stack>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Stack>
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        Company
                                    </Typography>

                                    <Button
                                        href={EXTERNAL_LINKS.HOME}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Home
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.ABOUT_US}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            About us
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.TEAM}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            The team
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Stack>
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        Learn
                                    </Typography>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.HOW_IT_WORKS}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            How it works
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.FAQS}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            FAQs
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.NEWS_ROOM}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            News Room
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Stack>
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        Connect
                                    </Typography>

                                    <Button
                                        href={EXTERNAL_LINKS.CONNECT.TWITTER}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Twitter
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.CONNECT.INSTAGRAM}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Instagram
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.CONNECT.LINKED_IN}
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            LinkedIn
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Stack>
                                    <Typography
                                        variant={'smallHeadline' as any}
                                    >
                                        Legal
                                    </Typography>

                                    <Button
                                        href={
                                            EXTERNAL_LINKS.LEGAL.PRIVACY_POLICY
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Privacy Policy
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={
                                            EXTERNAL_LINKS.LEGAL
                                                .TERMS_AND_CONDITIONS
                                        }
                                        variant="text"
                                    >
                                        <Typography variant="body2">
                                            Terms & Conditions
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.LEGAL.DISCLAIMER}
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

                <Grid item xs={12} lg={4}>
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
                        <Typography variant={'smallHeadline' as any}>
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
