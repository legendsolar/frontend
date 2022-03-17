import { Grid, Typography, Box, Stack } from "@mui/material";
import DefaultComponent from "./default_component";

const Footer = (props) => {
    return (
        <Box sx={{ mt: 10 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Stack>
                        <DefaultComponent>
                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <Stack>
                                        <Typography variant="smallHeadline">
                                            Company
                                        </Typography>
                                        <Typography variant="body2">
                                            Home
                                        </Typography>
                                        <Typography variant="body2">
                                            Available panels
                                        </Typography>
                                        <Typography variant="body2">
                                            About Us
                                        </Typography>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Stack>
                                        <Typography variant="smallHeadline">
                                            Company
                                        </Typography>
                                        <Typography variant="body2">
                                            Home
                                        </Typography>
                                        <Typography variant="body2">
                                            Available panels
                                        </Typography>
                                        <Typography variant="body2">
                                            About Us
                                        </Typography>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Stack>
                                        <Typography variant="smallHeadline">
                                            Company
                                        </Typography>
                                        <Typography variant="body2">
                                            Home
                                        </Typography>
                                        <Typography variant="body2">
                                            Available panels
                                        </Typography>
                                        <Typography variant="body2">
                                            About Us
                                        </Typography>
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
                                <Stack direction="row">
                                    <img
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                    ></img>
                                    <Stack>
                                        <Typography variant="subtitle1">
                                            Nera Lerner
                                        </Typography>
                                        <Typography variant="label">
                                            Cheif Operating Officer
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="row">
                                    <img
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                    ></img>
                                    <Stack>
                                        <Typography variant="subtitle1">
                                            Lassor Feasley
                                        </Typography>
                                        <Typography variant="label">
                                            Cheif Executive Officer
                                        </Typography>
                                    </Stack>
                                </Stack>
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

            <div style={{ height: "300px" }}></div>
        </Box>
    );
};

export default Footer;
