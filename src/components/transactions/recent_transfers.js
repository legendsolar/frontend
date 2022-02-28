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

import { useAuth } from "../../hooks/use_auth";
import { useObject } from "react-firebase-hooks/database";

import { database } from "../../firebase";
import { ref } from "firebase/database";

const RecentTransfers = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const [userDataSnap, userDataLoading, userDataError] = useObject(
        ref(database, "users/" + auth.user.uid)
    );

    const transactionStatus = useSelector((state) => state.transactions.status);
    const transactions = useSelector(selectTransactions);

    useEffect(() => {
        if (
            transactionStatus === "idle" &&
            !userDataLoading &&
            !userDataError
        ) {
            const userData = userDataSnap.val();
            console.log("dispatch");
            dispatch(fetchTransactions(userData.dwolla.userId));
        }
    }, [
        transactionStatus,
        userDataLoading,
        userDataError,
        userDataSnap,
        dispatch,
    ]);

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
