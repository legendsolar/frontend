import { Stack, Typography, Paper, Box, Grid } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material";
import DefaultView from "../views/default_view";
import { useChartDimensions } from "../hooks/use_chart_dimensions";

const SizingDemo = ({}) => {
    const theme = useTheme();

    const [color, setColor] = useState(theme.palette["legendaryGreen"].main);
    console.log("hex color: " + color);

    const chartSettings = {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    };

    const [refBox, dms] = useChartDimensions(chartSettings);
    // const [refBox2, dms2] = useChartDimensions(chartSettings);

    return (
        <DefaultView>
            <Stack spacing={6}>
                <Box
                    ref={refBox}
                    sx={{
                        backgroundColor: "legendaryGreen.main",
                        width: "100%",
                        height: "300px",
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        variant="headline1"
                        color="legendaryGreen.contrastText"
                    >
                        {dms.width + "px width"}
                    </Typography>
                </Box>

                <div>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    backgroundColor: "legendaryGreen.main",
                                    width: "100%",
                                    height: "300px",
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="smallHeadline"
                                    color="legendaryGreen.contrastText"
                                >
                                    Grid Item 1
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Box
                                sx={{
                                    backgroundColor: "legendaryGreen.main",
                                    width: "100%",
                                    height: "300px",
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="smallHeadline"
                                    color="legendaryGreen.contrastText"
                                >
                                    Grid Item 2
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Box
                                sx={{
                                    backgroundColor: "legendaryGreen.main",
                                    width: "100%",
                                    height: "300px",
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="smallHeadline"
                                    color="legendaryGreen.contrastText"
                                >
                                    Grid Item 3
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    backgroundColor: "legendaryGreen.main",
                                    width: "100%",
                                    height: "300px",
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="smallHeadline"
                                    color="legendaryGreen.contrastText"
                                >
                                    Grid Item 4
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <div>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                backgroundColor:
                                                    "legendaryGreen.main",
                                                width: "100%",
                                                height: "300px",
                                            }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                variant="smallHeadline"
                                                color="legendaryGreen.contrastText"
                                            >
                                                Nested Grid Item 1
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                backgroundColor:
                                                    "legendaryGreen.main",
                                                width: "100%",
                                                height: "300px",
                                            }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                variant="smallHeadline"
                                                color="legendaryGreen.contrastText"
                                            >
                                                Nested Grid Item 2
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    backgroundColor: "legendaryGreen.main",
                                    width: "100%",
                                    height: "300px",
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="smallHeadline"
                                    color="legendaryGreen.contrastText"
                                >
                                    Grid Item 5
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Stack>
        </DefaultView>
    );
};

export default SizingDemo;
