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

    const [snapshots, loading, error] = useList(ref(database, "users"));

    const allTransactionRef = useRef(null);
    if (!user) {
        console.log("Error, not signed in, auth state:");
        console.log(auth);
        return <div>Error, You're Not Signed In</div>;
    }

    const drawerWidth = 240;
    const drawerHeight = 600;

    // const drawerTitles = [
    //     "Personal Information",
    //     "Accreditation",
    //     "Banking Information",
    //     "Investment History",
    //     "Communication Prefernces",
    // ];

    const drawerTitles = ["Contact", "Wallet", "Accounts"];

    return (
        <SideBarNavView
            drawerWidth={drawerWidth}
            drawerHeight={drawerHeight}
            drawer={
                <div>
                    <Stack sx={{ p: 2 }}>
                        <Typography variant="mainDisplay">
                            John Compas
                        </Typography>
                        <Typography variant="unitLabel">
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
                </div>
            }
            mainContent={
                <div>
                    <Paper sx={{ p: 2, m: 2 }}>
                        <UserInfo></UserInfo>
                    </Paper>

                    <Paper sx={{ p: 2, m: 2 }}>
                        <Typography variant="dashboardHeader">
                            Wallet
                        </Typography>
                        <Stack
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="unitMainDisplay">
                                $1,750.00
                            </Typography>
                            <Button variant="contained">Transfer</Button>
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 2, m: 2 }}>
                        <Typography variant="dashboardHeader">
                            Accounts
                        </Typography>
                        <Stack
                            spacing={2}
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Typography>Bank of America Checking</Typography>
                            <Typography>Bank of America Savings</Typography>
                            <Typography>Bank of America Checking</Typography>
                        </Stack>
                    </Paper>
                </div>
            }
        ></SideBarNavView>
    );
}

AccountView.propTypes = {};

export default AccountView;
