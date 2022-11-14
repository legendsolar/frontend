import {Grid, Typography, Box, Stack, Button} from '@mui/material';
import {EXTERNAL_LINKS} from '@p/utils/webflow/webflowLinking';

export const Footer = () => {
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
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            Home
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.ABOUT_US}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            About us
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.TEAM}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
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
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            How it works
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.FAQS}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            FAQs
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.PAGES.NEWS_ROOM}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
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
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            Twitter
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.CONNECT.INSTAGRAM}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            Instagram
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.CONNECT.LINKED_IN}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
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
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
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
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            {'Terms & Conditions'}
                                        </Typography>
                                    </Button>

                                    <Button
                                        href={EXTERNAL_LINKS.LEGAL.DISCLAIMER}
                                        variant="text"
                                    >
                                        <Typography
                                            variant="body2"
                                            color={'blackDawn.main'}
                                        >
                                            Disclaimer
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Stack spacing={4}>
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

                            <Typography variant={'body1' as any}>
                                in Brooklyn, New York
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography variant={'body1' as any}>
                                Legends Incorporated
                            </Typography>
                            <Typography variant={'uppercaseDescription' as any}>
                                134 North 4th Street
                            </Typography>

                            <Typography variant={'uppercaseDescription' as any}>
                                Brooklyn, NY 11249
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

            <div style={{height: '100px'}}></div>
        </Box>
    );
};
