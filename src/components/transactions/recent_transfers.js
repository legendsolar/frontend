import { Grid, Typography, Paper } from "@mui/material";
import TransactionComponent from "./transfer_component";
import PropTypes from "prop-types";

import {
    selectTransactions,
    fetchTransactions,
} from "../../slices/transfer_slice";
import { useSelector, useDispatch } from "react-redux";
import { useCloudFunctions } from "../../hooks/use_cloud_functions";
import { useEffect } from "react";
import TransactionGrid from "./transaction_grid";

const RecentTransfers = () => {
    const dispatch = useDispatch();
    const cloudFunctions = useCloudFunctions();

    const transactionStatus = useSelector((state) => state.transactions.status);
    const transactions = useSelector(selectTransactions);

    useEffect(() => {
        if (transactionStatus === "idle") {
            dispatch(fetchTransactions(cloudFunctions));
        }
    }, [transactionStatus, dispatch]);

    if (transactionStatus === "loading") {
        return <Typography>loading</Typography>;
    } else if (transactionStatus === "succeeded" && transactions.length > 0) {
        return (
            <TransactionGrid
                title={"Recent Transactions"}
                transactions={transactions}
            ></TransactionGrid>
        );
    } else if (transactionStatus === "succeeded" && transactions.length == 0) {
        return <Typography>No transactions found </Typography>;
    } else {
        return <Typography>error</Typography>;
    }
};

export default RecentTransfers;
