import { useRef } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import SideBarNavView from "../views/side_bar_view";

import {
    Box,
    Stack,
    Button,
    Drawer,
    List,
    ListItemText,
    ListItemButton,
} from "@mui/material";

function TransactionView(props) {
    const theme = useTheme();
    console.log(theme);

    const drawerWidth = 240;
    const drawerHeight = 600;

    // const drawerTitles = [
    //     "Personal Information",
    //     "Accreditation",
    //     "Banking Information",
    //     "Investment History",
    //     "Communication Prefernces",
    // ];

    const drawerTitles = [
        "Earnings",
        "Investments",
        "Bank Transfers",
        "All Transactions",
    ];

    const allTransactionRef = useRef(null);

    const dividends = [
        {
            asset: "Barnyard Solar",
            amount: 25.31,
            destination: "Legends Wallet",
        },
    ];

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
                    </List>
                </div>
            }
            mainContent={
                <div>
                    <Paper sx={{ p: 2, m: 2, height: 500 }}>
                        <Typography variant="mainDisplay">
                            Dividend Earnings
                        </Typography>

                        <Typography>Testing</Typography>
                        <Typography>blabladsafsdf</Typography>
                    </Paper>

                    <Paper sx={{ p: 2, m: 2, height: 500 }}>
                        <Typography variant="mainDisplay">
                            Panel Purchases
                        </Typography>

                        <Typography>Testing</Typography>
                        <Typography>blabladsafsdf</Typography>
                    </Paper>

                    <Paper sx={{ p: 2, m: 2, height: 500 }}>
                        <Typography variant="mainDisplay">
                            Bank Transfers
                        </Typography>

                        <Typography>Testing</Typography>
                        <Typography>blabladsafsdf</Typography>
                    </Paper>

                    <Paper
                        sx={{ p: 2, m: 2, height: 500 }}
                        ref={allTransactionRef}
                    >
                        <Typography variant="mainDisplay">
                            All Transactions
                        </Typography>

                        <Typography>Testing</Typography>
                        <Typography>blabladsafsdf</Typography>
                    </Paper>
                </div>
            }
        ></SideBarNavView>
    );
}

export default TransactionView;
