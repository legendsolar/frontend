import { useRef } from "react";
import {
    Divider,
    Grid,
    Paper,
    Link,
    Typography,
    Container,
} from "@mui/material/";
import useTheme from "@mui/material/styles/useTheme";
import SideBarNavView from "../views/side_bar_view";
import TransferComponent from "../components/dividends/transfer_component";

import {
    Box,
    Stack,
    Button,
    Drawer,
    List,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import AllTransfersDataGrid from "../components/all_transfers_data_grid";

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
                <Paper variant="container" sx={{ m: 0 }}>
                    <Stack sx={{ p: 2 }}>
                        <Typography variant="mainDisplay">
                            John Compas
                        </Typography>
                        <Typography variant="unitLabel">
                            Member since 2021
                        </Typography>
                    </Stack>

                    <Divider />
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
                </Paper>
            }
            mainContent={
                <div>
                    <Paper variant="container" sx={{ minWidth: 450 }}>
                        <Typography variant="smallHeading">
                            Dividend Earnings
                        </Typography>

                        <Grid container sx={{ mt: 1 }}>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Dividend Payment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Dividend Payment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Dividend Payment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Dividend Payment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper variant="container">
                        <Typography variant="smallHeading">
                            Panel Purchases
                        </Typography>

                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper variant="container">
                        <Typography variant="smallHeading" sx={{ mb: 2 }}>
                            Bank Transfers
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                            <Grid item s={6}>
                                <TransferComponent
                                    title={"Solar Investment"}
                                    amount={55}
                                    source={"Barnyard Solar"}
                                    destination={"Bank of America"}
                                    date={new Date()}
                                ></TransferComponent>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper variant="container" ref={allTransactionRef}>
                        <Typography variant="smallHeading">
                            All Transactions
                        </Typography>

                        <AllTransfersDataGrid></AllTransfersDataGrid>
                    </Paper>
                </div>
            }
        ></SideBarNavView>
    );
}

export default TransactionView;
