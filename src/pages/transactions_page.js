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
import TransferComponent from "../components/transactions/transfer_component";

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
import TransactionGrid from "../components/transactions/transaction_grid";

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

    const contentRefs = useRef([]);

    const dividends = [
        {
            asset: "Barnyard Solar",
            amount: 25.31,
            destination: "Legends Wallet",
        },
    ];

    return (
        <SideBarNavView
            drawer={
                <Paper variant="container" sx={{ width: "300px", m: 0 }}>
                    <Stack sx={{ p: 2 }}>
                        <Typography variant="headline2">John Compas</Typography>
                        <Typography variant="label">
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
                                        contentRefs.current[index].offsetTop -
                                            180
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
                <Container sx={{ ml: "auto" }}>
                    <div ref={(el) => (contentRefs.current[0] = el)}>
                        <TransactionGrid
                            ref={(el) => (contentRefs.current[0] = el)}
                            title="Dividend Payments"
                            transactions={Array.from({ length: 4 }, (x, i) => {
                                return {
                                    title: "Dividend Payment",
                                    amount: Math.random() * 50 + 50,
                                    source: "Barnyard Solar",
                                    destination: "Legends Wallet",
                                    date: new Date(),
                                };
                            })}
                        ></TransactionGrid>
                    </div>

                    <div ref={(el) => (contentRefs.current[1] = el)}>
                        <TransactionGrid
                            ref={(el) => (contentRefs.current[1] = el)}
                            title="Investments"
                            transactions={Array.from({ length: 4 }, (x, i) => {
                                return {
                                    title: "Panel Investment",
                                    amount:
                                        Math.floor(Math.random() * 50) * 100,
                                    source: "Bank of America",
                                    destination: `Legends SPV ${(
                                        Math.random() * 50
                                    ).toFixed(0)}`,
                                    date: new Date(),
                                };
                            })}
                        ></TransactionGrid>
                    </div>

                    <div ref={(el) => (contentRefs.current[2] = el)}>
                        <TransactionGrid
                            title="Bank Transfers"
                            transactions={Array.from({ length: 4 }, (x, i) => {
                                return {
                                    title: "Transfer",
                                    amount: Math.random() * 50 + 50,
                                    source: "Legends Wallet",
                                    destination: "Bank of America",
                                    date: new Date(),
                                };
                            })}
                        ></TransactionGrid>
                    </div>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[3] = el)}
                    >
                        <Typography variant="smallHeading">
                            All Transactions
                        </Typography>

                        <AllTransfersDataGrid></AllTransfersDataGrid>
                    </Paper>
                </Container>
            }
        ></SideBarNavView>
    );
}

export default TransactionView;
