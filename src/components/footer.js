import { Grid, Typography, Box, Stack, Button } from "@mui/material";
import DefaultComponent from "./default_component";
import LassorImg from "../assets/Lassor.png";
import NeraImg from "../assets/Nera.png";

const Footer = () => {
    return (
        <Box sx={{ mt: 10 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Stack>
                        <DefaultComponent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={3}>
                                    <Stack>
                                        <Typography variant="smallHeadline">
                                            Company
                                        </Typography>

                                        <Button
                                            href={
                                                "https://www.legends.solar/reserve-panels"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                Reserve Panels
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/about-legends"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                About us
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/the-team"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                The team
                                            </Typography>
                                        </Button>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} lg={3}>
                                    <Stack>
                                        <Button
                                            href={
                                                "https://www.legends.solar/reserve-panels"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="smallHeadline">
                                                Learn
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/how-it-works"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                How it works
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/faqs"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                FAQs
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/news-room"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                News Room
                                            </Typography>
                                        </Button>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} lg={3}>
                                    <Stack>
                                        <Typography variant="smallHeadline">
                                            Connect
                                        </Typography>

                                        <Button
                                            href={
                                                "https://twitter.com/legends_solar"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                Twitter
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.instagram.com/legends.solar/"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                Instagram
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.linkedin.com/company/legendssolar/"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                LinkedIn
                                            </Typography>
                                        </Button>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} lg={3}>
                                    <Stack>
                                        <Typography variant="smallHeadline">
                                            Legal
                                        </Typography>

                                        <Button
                                            href={
                                                "https://www.legends.solar/legal/privacy-policy"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                Privacy Policy
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/legal/terms-and-conditions"
                                            }
                                            variant="text"
                                        >
                                            <Typography variant="body2">
                                                Terms & Conditions
                                            </Typography>
                                        </Button>

                                        <Button
                                            href={
                                                "https://www.legends.solar/legal/legal"
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
                        </DefaultComponent>

                        <DefaultComponent>
                            <Stack>
                                <Typography variant="smallHeadline">
                                    Recent Announcements
                                </Typography>
                                <Typography variant="body2">
                                    Sed posuere consectetur est at lobortis.
                                </Typography>

                                <Typography variant="body2">
                                    Sed posuere consectetur est at lobortis.
                                </Typography>

                                <Typography variant="body2">
                                    Sed posuere consectetur est at lobortis.
                                </Typography>
                            </Stack>
                        </DefaultComponent>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack>
                        {/* <Typography variant="smallHeadline">
                            Subscribe to our newsletter
                        </Typography>

                        <DefaultComponent></DefaultComponent> */}

                        <DefaultComponent>
                            <Stack>
                                <Typography variant="smallHeadline">
                                    Contact Us
                                </Typography>

                                <Button
                                    href={
                                        "mailto:nera@LetsBeLegends.com?subject=Let%27s%20Be%20Legends"
                                    }
                                >
                                    <Stack direction="row">
                                        <img
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                borderRadius: "5px",
                                            }}
                                            src={NeraImg}
                                        ></img>
                                        <Stack>
                                            <Typography variant="subtitle1">
                                                Nera Lerner
                                            </Typography>
                                            <Typography variant="label">
                                                Co-Founder & COO
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Button>
                                <Button
                                    href={
                                        "mailto:lassor@LetsBeLegends.com?subject=Let%27s%20Be%20Legends"
                                    }
                                >
                                    <Stack direction="row">
                                        <img
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                borderRadius: "5px",
                                            }}
                                            src={LassorImg}
                                        ></img>
                                        <Stack>
                                            <Typography variant="subtitle1">
                                                Lassor Feasley
                                            </Typography>
                                            <Typography variant="label">
                                                Founder & CEO
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Button>
                            </Stack>
                        </DefaultComponent>

                        <Typography variant="label" sx={{ fontWeight: "700" }}>
                            Legends Incorporated
                        </Typography>
                        <Typography variant="label">
                            134 North 4th Street Brooklyn, NY 11249
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={8}></Grid>
                <div></div>
            </Grid>

            <Stack sx={{ mt: 8, p: 4 }}>
                <Typography variant="subtitle3">Disclaimer</Typography>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Stack>
                                <Typography variant="description">
                                    No offers to sell or solicitations of an
                                    offer to buy securities or any other type of
                                    investment are being made or solicited by
                                    Legends Incorporated at this time. No money
                                    or other consideration is being solicited,
                                    and if sent in response, will not be
                                    accepted. Any indication of interest that
                                    you may provide (including by submitting an
                                    email address at which you can be contacted
                                    or receive further information) involves no
                                    obligation or commitment of any kind.
                                </Typography>

                                <Typography variant="description">
                                    Legends Incorporated is not a registered
                                    broker-dealer, investment adviser, or
                                    crowdfunding portal and does not engage in
                                    any activities requiring any such
                                    registration. The information contained on
                                    this website is provided for informational
                                    and discussion purposes only and is not
                                    intended to be a recommendation to invest
                                    in, or purchase, sell, or hold, any
                                    securities, or to engage in any type of
                                    transaction. Any such offers will only be
                                    made pursuant to formal offering materials
                                    containing full details regarding risks,
                                    investment terms, and fees.
                                </Typography>

                                <Typography variant="description">
                                    Please consult with your legal and financial
                                    advisors before investing and do not invest
                                    unless you are able to sustain the risk of
                                    loss of your entire investment. Past
                                    performance is no guarantee of future
                                    results. Any historical returns, expected
                                    returns, or probability projections are
                                    forward looking statements and may not
                                    reflect actual future performance. All
                                    investments involve risk and may result in
                                    loss.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack>
                                <Typography variant="description">
                                    This website contains forward-looking
                                    statements that are based on our beliefs and
                                    assumptions and on information currently
                                    available to us. In some cases, you can
                                    identify forward-looking statements by the
                                    following words: "estimated," “will,”
                                    “expect,” “would,” “intend,” “believe,” or
                                    other comparable terminology.
                                </Typography>

                                <Typography variant="description">
                                    Forward-looking statements in this website
                                    include, but are not limited to, statements
                                    about our business plan, potential
                                    investments in renewable energy projects,
                                    our market opportunities and beliefs, and
                                    our objectives for future operations. These
                                    statements involve risks, uncertainties,
                                    assumptions and other factors that may cause
                                    actual results or performance to be
                                    materially different. We cannot assure you
                                    that the forward-looking statements will
                                    prove to be accurate. These forward-looking
                                    statements speak only as of the date hereof.
                                    We disclaim any obligation to update these
                                    forward-looking statements.
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
                <Typography variant="subtitle3">
                    © 2022 Legends Incorporated. All rights reserved.
                </Typography>
            </Stack>

            <div style={{ height: "100px" }}></div>
        </Box>
    );
};

export default Footer;
