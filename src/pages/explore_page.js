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
import { useNavigate } from "react-router-dom";

import investmentOpportunities from "../utils/asset_data";

const ExplorePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const contentRefs = useRef([]);
    const drawerTitles = [
        "Santa Rosa Solar",
        "Glassboro Solar",
        "Lake Elsinore Solar",
        "Lindenwold Solar",
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
                    {Object.entries(investmentOpportunities).map(
                        ([key, investment], i) => (
                            <DefaultComponent
                                key={i}
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
                                                    color={
                                                        theme.palette[
                                                            investment.color
                                                        ].main
                                                    }
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
                                                <Button
                                                    variant="primary"
                                                    onClick={() => {
                                                        navigate(
                                                            "/invest/" + key
                                                        );
                                                    }}
                                                >
                                                    View executive summary
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </DefaultComponent>
                        )
                    )}
                </Stack>
            }
        ></SideBarNavView>
    );
};

ExplorePage.propTypes = {};

export default ExplorePage;
