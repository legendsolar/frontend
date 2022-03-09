import { useReducer, useRef } from "react";
import InvestContent from "../content/invest_content";
import { Box, Typography, Paper, Stack, Button, Grid } from "@mui/material";
import SideBarNavView from "../views/side_bar_view";
import OfferingComponent from "../components/offering";
import DefaultComponent from "../components/default_component";
import SolarPicture from "../assets/solar_frame.png";
import PanelsSvg from "../components/icons/panels_svg";
import { useTheme } from "@mui/material";
import MetricList from "../components/summary/metric_list";
import PrecommitLetterComponent from "../components/precommit_letter_component";

const InvestPage = () => {
    const theme = useTheme();
    const contentRefs = useRef([]);
    const drawerTitles = ["Contact", "Wallet", "Accounts"];

    const initState = {
        userState: "EDITING",
    };

    const reducer = (state, action) => {
        console.log({ state, action });
        console.log(state.userState, action.type);
        switch (action.type) {
            case "CHANGE_USERSTATE":
                return {
                    ...state,
                    userState: action.userState,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initState);

    const sidebarEditState = (
        <Stack spacing={4}>
            <Typography variant="smallHeadline">Pre-commit</Typography>
            <PanelsSvg color={theme.palette.skyBlue.main}></PanelsSvg>
            <MetricList
                valuePairs={[
                    {
                        metric: "Available panels",
                        value: "300/300",
                    },
                    {
                        metric: "Total Investment",
                        value: "$74,500",
                    },
                ]}
            ></MetricList>
            <Button
                variant="primary"
                onClick={() =>
                    dispatch({
                        type: "CHANGE_USERSTATE",
                        userState: "REVIEWING",
                    })
                }
            >
                Sign pre-commitment
            </Button>
        </Stack>
    );

    const sidebarReviewState = (
        <Stack spacing={4}>
            <PanelsSvg color={theme.palette.skyBlue.main}></PanelsSvg>
            <MetricList
                valuePairs={[
                    {
                        metric: "Total panels",
                        value: "300/300",
                    },
                    {
                        metric: "Total Investment",
                        value: "$74,500",
                    },
                ]}
            ></MetricList>

            {state.userState === "REVIEWING" && (
                <Button
                    variant="secondary"
                    onClick={() =>
                        dispatch({
                            type: "CHANGE_USERSTATE",
                            userState: "EDITING",
                        })
                    }
                >
                    {"Edit pre-commitment"}
                </Button>
            )}

            {state.userState === "CONFIRMED" && (
                <Button variant="secondary" onClick={() => {}}>
                    {"Complete payment"}
                </Button>
            )}
        </Stack>
    );

    const precommitConfirmed = (
        <DefaultComponent>
            <Stack spacing={4}>
                <Typography variant="smallHeadline">Confirmation</Typography>
                <Typography variant="headline1">
                    Pre-commitment confirmed
                </Typography>
                <Button sx={{ width: "200px" }} variant="medium">
                    Review Commitment
                </Button>
            </Stack>
        </DefaultComponent>
    );

    return (
        <SideBarNavView
            drawerAppearsOnBotton={true}
            drawerAppearsOnTop={false}
            header={state.userState === "CONFIRMED" && precommitConfirmed}
            drawer={
                <Paper variant="container">
                    {state.userState === "EDITING" && sidebarEditState}
                    {state.userState === "REVIEWING" && sidebarReviewState}
                    {state.userState === "CONFIRMED" && sidebarReviewState}
                </Paper>
            }
            mainContent={
                <div>
                    {state.userState === "EDITING" && (
                        <InvestContent></InvestContent>
                    )}

                    {state.userState === "REVIEWING" && (
                        <PrecommitLetterComponent
                            onComplete={() =>
                                dispatch({
                                    type: "CHANGE_USERSTATE",
                                    userState: "CONFIRMED",
                                })
                            }
                        ></PrecommitLetterComponent>
                    )}

                    {state.userState === "CONFIRMED" && (
                        <InvestContent></InvestContent>
                    )}
                </div>
            }
        ></SideBarNavView>
    );
};

InvestPage.propTypes = {};

export default InvestPage;
