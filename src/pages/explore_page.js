import { useRef } from "react";
import { Typography, Paper, Box, Stack, Button, Grid } from "@mui/material";
import SideBarNavView from "../views/side_bar_view";
import OfferingComponent from "../components/offering";
import MetricList from "../components/summary/metric_list";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import DefaultComponent from "../components/default_component";
import { InvestmentAccountSubtype } from "plaid";
import { useTheme } from "@mui/material";
import PanelsSvg from "../components/icons/panels_svg";

const ExplorePage = () => {
    const theme = useTheme();
    const contentRefs = useRef([]);
    const drawerTitles = [
        "Santa Rosa Solar",
        "Glassboro Solar",
        "Lake Elsinore Solar",
        "Lindenwold Solar",
    ];

    const investmentOpportunities = [
        {
            title: "Santa Rosa Solar",
            metrics: [
                {
                    metric: "Available Panels",
                    value: "300",
                },
                {
                    metric: "Minimum Investment",
                    value: "$74,500",
                },
            ],
            color: theme.palette.skyBlue.main,
        },

        {
            title: "Glassboro Solar",
            metrics: [
                {
                    metric: "Available Panels",
                    value: "300",
                },
                {
                    metric: "Minimum Investment",
                    value: "$74,500",
                },
            ],
            color: theme.palette.pencilYellow.main,
        },

        {
            title: "Lake Elsinore Solar",
            metrics: [
                {
                    metric: "Available Panels",
                    value: "300",
                },
                {
                    metric: "Minimum Investment",
                    value: "$74,500",
                },
            ],
            color: theme.palette.grassGreen.main,
        },

        {
            title: "Lindenwold Solar",
            metrics: [
                {
                    metric: "Available Panels",
                    value: "300",
                },
                {
                    metric: "Minimum Investment",
                    value: "$74,500",
                },
            ],
            color: theme.palette.eraserRed.main,
        },
    ];

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={
                        <Typography variant="smallHeadline">
                            Available Solar Facilities
                        </Typography>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={4}>
                    {investmentOpportunities.map((investment, i) => (
                        <DefaultComponent
                            ref={(el) => (contentRefs.current[i] = el)}
                        >
                            <Stack spacing={4}>
                                <Typography variant="smallHeadline">
                                    {investment.title}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} lg={8}>
                                        <Box
                                            sx={{
                                                height: "240px",
                                                borderRadius: "15px",
                                                backgroundColor:
                                                    "whiteHaze.main",
                                                mr: {
                                                    xs: 0,
                                                    lg: 4,
                                                },
                                                mb: {
                                                    xs: 4,
                                                    lg: 0,
                                                },
                                            }}
                                            display="flex"
                                            justifyContent={"center"}
                                            alignItems="center"
                                        >
                                            <PanelsSvg
                                                color={investment.color}
                                            ></PanelsSvg>
                                        </Box>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        lg={4}
                                        sx={{ height: "100%" }}
                                    >
                                        <Stack
                                            justifyContent={"space-between"}
                                            sx={{ height: "100%" }}
                                            spacing={4}
                                        >
                                            {investment.metrics.map(
                                                ({ metric, value }) => (
                                                    <Stack
                                                        direction="row"
                                                        justifyContent={
                                                            "space-between"
                                                        }
                                                        alignItems="center"
                                                        key={metric + value}
                                                    >
                                                        <Typography variant="subtitle1">
                                                            {metric}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            {value}
                                                        </Typography>
                                                    </Stack>
                                                )
                                            )}
                                            <Button variant="primary">
                                                View executive summary
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </DefaultComponent>
                    ))}
                </Stack>
            }
        ></SideBarNavView>
    );
};

ExplorePage.propTypes = {};

export default ExplorePage;
