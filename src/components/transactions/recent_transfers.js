import { Grid, Typography, Paper } from "@mui/material";
import TransactionComponent from "./transfer_component";
import PropTypes from "prop-types";

import {
    selectTransactions,
    fetchTransactions,
} from "../../slices/transaction_slice";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import TransactionGrid from "./transaction_grid";

const RecentTransfers = () => {
    const dispatch = useDispatch();

    const transactionStatus = useSelector((state) => state.transactions.status);
    const transactions = useSelector(selectTransactions);

    useEffect(() => {
        if (transactionStatus === "idle") {
            dispatch(fetchTransactions());
        }
    }, [transactionStatus, dispatch]);

    if (transactionStatus === "loading") {
        return <Typography>loading</Typography>;
    } else if (transactionStatus === "succeeded") {
        return (
            <TransactionGrid
                title={"Recent Transactions"}
                transactions={transactions}
            ></TransactionGrid>
        );
    } else {
        return <Typography>error</Typography>;
    }
};

export default RecentTransfers;
