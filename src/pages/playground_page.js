import { Paper, Typography, Stack, Button } from "@mui/material";
import DefaultView from "../views/default_view";

import { nanoid } from "@reduxjs/toolkit";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
    decrement,
    increment,
    incrementAsync,
    selectCount,
} from "../slices/counter_slice";

import {
    addTransaction,
    selectTransactions,
    fetchTransactions,
    createTransaction,
    totalTransactions,
} from "../slices/dwolla_slice";
import { useEffect } from "react";

const PlaygroundPage = () => {
    const count = useSelector(totalTransactions);
    const transactions = useSelector(selectTransactions);
    const dispatch = useDispatch();

    const transactionStatus = useSelector((state) => state.dwolla.status);

    const [createTransactionStatus, setCreateTransactionStatus] =
        useState("idle");

    const canCreateTransaction = createTransactionStatus === "idle";

    const onCreateTransaction = async () => {
        if (canCreateTransaction) {
            try {
                setCreateTransactionStatus("pending");
                await dispatch(
                    createTransaction({
                        id: nanoid(),
                        title: "user created transaction",
                    })
                );
            } catch (error) {
                console.log("create transaction failed: ", error);
            } finally {
                setCreateTransactionStatus("idle");
            }
        }
    };

    useEffect(() => {
        if (transactionStatus === "idle") {
            dispatch(fetchTransactions());
        }
    }, [transactionStatus, dispatch]);

    return (
        <DefaultView>
            <Paper variant="container">
                <Typography variant="smallHeadline">Documents</Typography>
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "500px" }}
                >
                    {transactions.map((transaction) => (
                        <Typography key={transaction.id}>
                            {transaction.title}
                        </Typography>
                    ))}

                    {transactionStatus === "loading" && (
                        <Typography>loading...</Typography>
                    )}

                    <Button
                        onClick={() => onCreateTransaction()}
                        disabled={!canCreateTransaction}
                    >
                        add transaction
                    </Button>
                </Stack>

                <Typography>total transactions</Typography>
                <Typography>{count}</Typography>
            </Paper>
        </DefaultView>
    );
};

export default PlaygroundPage;
