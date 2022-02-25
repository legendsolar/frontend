import { useRef } from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import { useObject } from "react-firebase-hooks/database";

import { Typography, Paper, Stack, Button } from "@mui/material";

import UserInfo from "../components/user_info";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import OfferingComponent from "../components/offering";
import MetricList from "../components/summary/metric_list";

function ExplorePage(props) {
    const auth = useAuth();
    const user = auth.user;

    const contentRefs = useRef([]);

    const [userInfoSnap, userInfoSnapLoading, userInfoSnapError] = useObject(
        ref(database, "users/" + user.uid)
    );

    var name = "";
    var memberInfo = "Member since 2022";

    if (!!userInfoSnap && !userInfoSnapLoading && !userInfoSnapError) {
        const userInfoObj = userInfoSnap.val();

        if (
            userInfoObj.info &&
            userInfoObj.info.firstName &&
            userInfoObj.info.lastName
        ) {
            name = userInfoObj.info.firstName + " " + userInfoObj.info.lastName;
        }
    }

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
}

ExplorePage.propTypes = {};

export default ExplorePage;
