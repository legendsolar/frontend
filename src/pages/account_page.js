import { useRef } from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../Firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import { useObject } from "react-firebase-hooks/database";

import { Typography, Paper, Stack, Button } from "@mui/material";

import UserInfo from "../components/user_info";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";

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
                            <Typography variant="headline2">{name}</Typography>
                            <Typography variant="label">
                                {memberInfo}
                            </Typography>
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
                <div>
                    <div ref={(el) => (contentRefs.current[0] = el)}>
                        <UserInfo></UserInfo>
                    </div>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">Wallet</Typography>
                        <Stack
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="headline1">
                                $1,750.00
                            </Typography>
                            <Button variant="contained" color="legendaryGreen">
                                Transfer To Account
                            </Button>
                        </Stack>
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
                </div>
            }
        ></SideBarNavView>
    );
}

AccountView.propTypes = {};

export default AccountView;
