import {
    Stack,
    Button,
    Typography,
    TextField,
    InputAdornment,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AccountManagementComponent from "./account_management_component";
import { useState, useReducer, useEffect } from "react";
import ErrorComponent from "../errors/error_component";
import { useCloudFunctions } from "../../hooks/use_cloud_functions";
import { fetchTransactions } from "../../slices/transfer_slice";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAccounts,
    selectAllAccounts,
    selectWalletId,
} from "../../slices/wallet_slice";

import { validateTransferAmount } from "../../validation/transaction_validation";
import TransactionComponent from "../transactions/transfer_component";
import LoadingComponent from "../loading_component";
import MultiSelect from "../multiselect";

const CreateTransactionComponent = () => {
    const cloudFunctions = useCloudFunctions();
    const globalDispatch = useDispatch();

    const initialState = {
        page: "setup",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_VIEW":
                return {
                    ...state,
                    page: action.page,
                    accountSelectType: action.accountSelectType,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const [sourceAccount, setSourceAccount] = useState(null);
    const [destinationAccount, setDestinationAccount] = useState(null);

    const [transferAmount, setTransferAmount] = useState(undefined);

    const transactionStatus = useSelector((state) => state.transactions.status);

    const [loading, setLoading] = useState(false);

    const accountStatus = useSelector((state) => state.wallet.accounts.status);

    const walletId = useSelector(selectWalletId);

    const walletObject = {
        name: "Wallet",
        source: "Created on Legends",
        type: "wallet",
        institution: "Legends",
        id: walletId,
    };

    useEffect(() => {
        if (accountStatus === "idle") {
            console.log(
                "dispatch fetch accounts : line 79, create transaction page"
            );
            dispatch(fetchAccounts(cloudFunctions));
        }
    }, [accountStatus, dispatch]);

    const accounts = [walletObject, ...useSelector(selectAllAccounts)];

    const goBack = () => {
        dispatch({
            type: "CHANGE_VIEW",
            page: "setup",
        });
    };

    const onAccountSelected = (event) => {
        const { name, value } = event.target;

        console.log(event.target);
        console.log(name, value);

        const account = accounts.filter((account) => account.id === value)[0];
        if (name === "sourceAccount") {
            setSourceAccount(account);
        } else if (name === "destinationAccount") {
            setDestinationAccount(account);
        }
    };

    const onComplete = () => {
        const sourceAccountId = sourceAccount.id;
        const destinationAccountId = destinationAccount.id;
        const amount = transferAmount;

        setLoading(true);

        cloudFunctions
            .createTransfer({
                source: sourceAccountId,
                destination: destinationAccountId,
                amount: amount,
            })
            .then((resp) => {
                console.log("new transfer created with id:");
                console.log(resp);

                // Refresh transactions
                if (
                    transactionStatus === "idle" ||
                    transactionStatus === "succeeded"
                ) {
                    globalDispatch(fetchTransactions(cloudFunctions));
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);

                dispatch({
                    type: "CHANGE_VIEW",
                    page: "confirmed",
                });
            });
    };

    if (!accounts || accountStatus !== "succeeded") {
        return <LoadingComponent></LoadingComponent>;
    }
    console.log("accounts: ");
    console.log(accounts);
    console.log(sourceAccount);
    console.log(destinationAccount);

    if (state.page === "setup") {
        return (
            <Stack spacing={2}>
                <Typography variant="smallHeadline">Transfer Cash</Typography>

                <TextField
                    name="amount"
                    type="number"
                    label="Amount"
                    value={transferAmount}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    }}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setTransferAmount(value);
                    }}
                    onBlur={(e) => {
                        const validatedAmount =
                            validateTransferAmount(transferAmount);

                        setTransferAmount(validatedAmount.value);
                    }}
                ></TextField>

                <MultiSelect
                    name={"sourceAccount"}
                    text="From"
                    fields={accounts.map((account) => {
                        return { ...account, text: account.name };
                    })}
                    onChangeListener={onAccountSelected}
                ></MultiSelect>

                <MultiSelect
                    name={"destinationAccount"}
                    text="To"
                    fields={accounts.map((account) => {
                        return { ...account, text: account.name };
                    })}
                    onChangeListener={onAccountSelected}
                ></MultiSelect>

                <Button
                    variant="primary"
                    disabled={
                        !destinationAccount || !sourceAccount || !transferAmount
                    }
                    onClick={() => {
                        dispatch({
                            type: "CHANGE_VIEW",
                            page: "review",
                        });
                    }}
                >
                    {" "}
                    Review Transfer
                </Button>
            </Stack>
        );
    } else if (state.page === "review") {
        return (
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center">
                    <Button onClick={goBack} variant="mono">
                        <ArrowBackIcon
                            sx={{
                                fontSize: "22px",
                            }}
                        ></ArrowBackIcon>
                    </Button>

                    <Typography variant="smallHeadline">
                        {"Confirm Transfer"}
                    </Typography>
                </Stack>

                <TransactionComponent
                    title={"May 25th, 2022"}
                    amount={transferAmount}
                    source={sourceAccount?.name}
                    destination={destinationAccount?.name}
                ></TransactionComponent>

                <Typography>{`$${transferAmount} will be deducted from your Legends Wallet within the next several days. It may take up to 5 days to transfer.`}</Typography>

                <Button
                    variant="primary"
                    onClick={onComplete}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress color="dark" size={30} />
                    ) : (
                        "Confirm Transfer"
                    )}
                </Button>
            </Stack>
        );
    } else if (state.page === "confirmed") {
        return (
            <Stack spacing={2}>
                <Typography variant="smallHeadline">
                    Transfer Pending
                </Typography>

                <TransactionComponent
                    title={"May 25th, 2022"}
                    amount={transferAmount}
                    source={sourceAccount?.name}
                    destination={destinationAccount?.name}
                ></TransactionComponent>

                <Typography>{`$${transferAmount} will be deducted from your Legends Wallet within the next several days. It may take up to 5 days to transfer.`}</Typography>

                <Button
                    variant="primary"
                    sx={{
                        backgroundColor: "pencilYellow.main",
                    }}
                    onClick={onComplete}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress color="dark" size={30} />
                    ) : (
                        "Transfer Pending"
                    )}
                </Button>
            </Stack>
        );
    }

    return (
        <>
            <ErrorComponent></ErrorComponent>
        </>
    );
};

export default CreateTransactionComponent;
