import { useRef } from "react";
import { Typography, Paper, Stack, Button } from "@mui/material";
import SideBarNavView from "../views/side_bar_view";
import OfferingComponent from "../components/offering";
import MetricList from "../components/summary/metric_list";

const ExplorePage = () => {
    const contentRefs = useRef([]);
    const drawerTitles = ["Contact", "Wallet", "Accounts"];

    return (
        <SideBarNavView
            drawer={
                <Paper variant="container">
                    <Stack>
                        <Typography variant="smallHeadline">Commit</Typography>
                        <MetricList
                            valuePairs={[
                                {
                                    metric: "Available panels",
                                    value: "140/300",
                                },
                                {
                                    metric: "Total Investment",
                                    value: "$25,000",
                                },
                            ]}
                        ></MetricList>
                        <Button variant="secondary">Precommit to invest</Button>
                    </Stack>
                </Paper>
            }
            mainContent={
                <Paper
                    variant="container"
                    ref={(el) => (contentRefs.current[1] = el)}
                >
                    <OfferingComponent></OfferingComponent>
                </Paper>
            }
        ></SideBarNavView>
    );
};

ExplorePage.propTypes = {};

export default ExplorePage;
