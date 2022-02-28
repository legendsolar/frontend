import { useRef } from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import { useObject } from "react-firebase-hooks/database";

import { Typography, Paper, Stack, Button } from "@mui/material";
import Wallet from "../components/wallet_component";
import UserInfo from "../components/user_info";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";

function AccountView(props) {
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
                <ScrollToSidebar
                    header={
                        <Stack sx={{ p: 2 }}>
                            <MemberHeader></MemberHeader>
                            <Button
                                variant="contained"
                                color="legendaryGreen"
                                onClick={() => auth.signout()}
                            >
                                Sign Out
                            </Button>
                        </Stack>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={2}>
                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <UserInfo></UserInfo>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Wallet></Wallet>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Accounts
                        </Typography>
                        <Stack
                            spacing={2}
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            {[
                                "Bank of America Checking",
                                "Bank of America Savings",
                            ].map((name) => {
                                return (
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="body1">
                                            {name}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            color="legendaryGreen"
                                        >
                                            Manage
                                        </Button>
                                    </Stack>
                                );
                            })}

                            <Button variant="contained" color="legendaryGreen">
                                Link New Account
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
}

AccountView.propTypes = {};

export default AccountView;
