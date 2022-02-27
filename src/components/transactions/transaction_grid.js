import { Grid, Typography, Paper } from "@mui/material";
import TransactionComponent from "./transfer_component";
import PropTypes from "prop-types";

const TransactionGrid = ({ title, transactions }) => {
    console.log("loaded: " + transactions);
    return (
        <div>
            <Typography variant="smallHeading">{title}</Typography>

            <Grid
                container
                sx={{ mt: 1 }}
                justifyContent="center"
                alignItems="center"
            >
                {transactions.map((transaction) => {
                    return (
                        <Grid item s={6} key={transaction.id}>
                            <TransactionComponent
                                title={
                                    "title" in transaction
                                        ? transactions.title
                                        : "unknown"
                                }
                                amount={parseFloat(transaction.amount.value)}
                                source={
                                    "source" in transaction
                                        ? transactions.source
                                        : "unknown"
                                }
                                destination={
                                    "destination" in transaction
                                        ? transactions.destination
                                        : "unknown"
                                }
                                date={transaction.created}
                            ></TransactionComponent>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

TransactionGrid.propTypes = {
    title: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            amount: PropTypes.shape({
                value: PropTypes.string.isRequired,
                currency: PropTypes.string.isRequired,
            }),
            // source: PropTypes.string.isRequired,
            // destination: PropTypes.string.isRequired,
            created: PropTypes.string.isRequired,
        })
    ),
};

export default TransactionGrid;
