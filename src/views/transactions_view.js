import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import NavBar from "../components/nav_bar";
import { Button } from "@mui/material";

function TransactionView(props) {
    const theme = useTheme();
    console.log(theme);

    return (
        <div>
            <NavBar></NavBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}

                    <Grid item xs={12} md={12} lg={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Your Wallet
                            </Typography>

                            <Typography
                                sx={{ fontSize: 24 }}
                                color="text.primary"
                                gutterBottom
                            >
                                {"$1,205.78"}
                            </Typography>

                            <Button>Transfer</Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Dividend Earnings
                            </Typography>

                            <Typography
                                sx={{ fontSize: 12 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Past Month
                            </Typography>

                            <Typography
                                sx={{ fontSize: 20 }}
                                color="text.primary"
                                gutterBottom
                            >
                                {"$" + ((55000 * 0.075) / 12).toFixed(2)}
                            </Typography>

                            <Typography
                                sx={{ fontSize: 12 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Past Year
                            </Typography>

                            <Typography
                                sx={{ fontSize: 20 }}
                                color="text.primary"
                                gutterBottom
                            >
                                {"$" + (55000 * 0.075).toFixed(2)}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Investments
                            </Typography>

                            <Typography
                                sx={{ fontSize: 24 }}
                                color="text.primary"
                                gutterBottom
                            >
                                {"$55,000"}
                            </Typography>

                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Project
                            </Typography>

                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.primary"
                                gutterBottom
                            >
                                Barnyard Solar
                            </Typography>

                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Account Origination
                            </Typography>

                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.primary"
                                gutterBottom
                            >
                                Bank of America Checking
                            </Typography>

                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Invested On
                            </Typography>

                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.primary"
                                gutterBottom
                            >
                                3/27/2022
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default TransactionView;
