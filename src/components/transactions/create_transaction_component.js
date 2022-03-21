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
import LoadingComponent from "../loading_component";

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
        if (name === "sourceAccount") {
            setSourceAccount(value);
        } else if (name === "destinationAccount") {
            setDestinationAccount(value);
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

                dispatch({
                    type: "CHANGE_VIEW",
                    page: "confirmed",
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);

                setSourceAccount(null);
                setDestinationAccount(null);
                setTransferAmount(null);

                dispatch({
                    type: "CHANGE_VIEW",
                    page: "setup",
                });
            });
    };

    if (!accounts || accountStatus !== "succeeded") {
        return <LoadingComponent></LoadingComponent>;
    }
    console.log(accounts);

    if (state.page === "setup") {
        return (
            <Stack spacing={2}>
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
                ></TextField>

                <FormControl variant="filled" fullWidth>
                    <InputLabel>From</InputLabel>
                    <Select
                        helperText={"From"}
                        name="sourceAccount"
                        value={sourceAccount}
                        onChange={onAccountSelected}
                    >
                        {accounts.map((account, index) => {
                            return (
                                <MenuItem key={account.id} value={account}>
                                    {account.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth>
                    <InputLabel>To</InputLabel>
                    <Select
                        helperText={"To"}
                        name="destinationAccount"
                        value={destinationAccount}
                        onChange={onAccountSelected}
                    >
                        {accounts.map((account, index) => {
                            return (
                                <MenuItem key={account.id} value={account}>
                                    {account.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

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
                <Typography>Review Transfer</Typography>

                <Button variant="mini" onClick={goBack}>
                    Back
                </Button>

                <Typography>
                    {"From: " +
                        sourceAccount?.institution +
                        " " +
                        sourceAccount?.name}
                </Typography>

                <Typography>
                    {"To: " +
                        destinationAccount?.institution +
                        " " +
                        destinationAccount?.name}
                </Typography>

                <Typography>{"Amount: " + transferAmount}</Typography>

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
                <Typography>Transfer Submitted</Typography>
                <Button variant="mini" onClick={goBack}>
                    Back
                </Button>
                <Typography>
                    Funds will be available within 4 business days
                </Typography>
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
