import { Grid, Typography, Paper } from "@mui/material";
import TransactionComponent from "./transfer_component";
import PropTypes from "prop-types";

const TransactionGrid = ({ title, transactions }) => {
    return (
        <Paper variant="container" sx={{ minWidth: 450 }}>
            <Typography variant="smallHeading">{title}</Typography>

            <Grid
                container
                sx={{ mt: 1 }}
                justifyContent="center"
                alignItems="center"
            >
                {transactions.map((transaction) => {
                    return (
                        <Grid item s={6}>
                            <TransactionComponent
                                title={transaction.title}
                                amount={transaction.amount}
                                source={transaction.source}
                                destination={transaction.destination}
                                date={transaction.date}
                            ></TransactionComponent>
                        </Grid>
                    );
                })}
            </Grid>
        </Paper>
    );
};

TransactionGrid.propTypes = {
    title: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            source: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date),
        })
    ),
};

export default TransactionGrid;
