import { useRef } from "react";
import PropTypes from "prop-types";
import { auth, database, firebaseApp } from "../Firebase";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";

import {
    Typography,
    Paper,
    Stack,
    Button,
    Drawer,
    List,
    ListItemText,
    ListItemButton,
    Divider,
} from "@mui/material";

import UserInfo from "../components/user_info";
import SideBarNavView from "../views/side_bar_view";

function AccountView(props) {
    const auth = useAuth();
    const user = auth.user;

    const allTransactionRef = useRef(null);

    const drawerWidth = 240;
    const drawerHeight = 600;

    const drawerTitles = ["Contact", "Wallet", "Accounts"];

    return (
        <SideBarNavView
            drawerWidth={drawerWidth}
            drawerHeight={drawerHeight}
            drawer={
                <Paper variant="container" sx={{ m: 0 }}>
                    <Stack sx={{ p: 2 }}>
                        <Typography variant="headline2">John Compas</Typography>
                        <Typography variant="label">
                            Member since 2021
                        </Typography>
                    </Stack>
                    <List>
                        {drawerTitles.map((text, index) => (
                            <ListItemButton
                                key={text}
                                onClick={() =>
                                    window.scrollTo(
                                        0,
                                        allTransactionRef.current.offsetTop -
                                            165
                                    )
                                }
                            >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}

                        <Divider />

                        <ListItemButton onClick={() => auth.signout()}>
                            <ListItemText primary={"Sign Out"} />
                        </ListItemButton>
                    </List>
                </Paper>
            }
            mainContent={
                <div>
                    <UserInfo></UserInfo>

                    <Paper variant="container">
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
                                Transfer
                            </Button>
                        </Stack>
                    </Paper>

                    <Paper variant="container">
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
