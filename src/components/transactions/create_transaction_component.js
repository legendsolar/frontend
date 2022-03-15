import {
    Stack,
    Button,
    Typography,
    TextField,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import AccountManagementComponent from "./account_management_component";
import { useState, useReducer } from "react";
import ErrorComponent from "../errors/error_component";
import { useCloudFunctions } from "../../hooks/use_cloud_functions";

const CreateTransactionComponent = () => {
    const cloudFunctions = useCloudFunctions();

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
            case "BACK":
                return;
            case "review":
                return;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const [sourceAccount, setSourceAccount] = useState(null);
    const [destinationAccount, setDestinationAccount] = useState(null);

    const [transferAmount, setTransferAmount] = useState(0.0);

    const [loading, setLoading] = useState(false);

    const goBack = () => {
        dispatch({
            type: "CHANGE_VIEW",
            page: "setup",
        });
    };

    const onAccountSelected = (account) => {
        console.log(account);
        if (state.accountSelectType === "source") {
            setSourceAccount(account);
        } else if (state.accountSelectType === "destination") {
            setDestinationAccount(account);
        }

        dispatch({
            type: "CHANGE_VIEW",
            page: "setup",
        });
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
            });
    };

    if (state.page === "setup") {
        return (
            <Stack spacing={2}>
                <Typography>Set up transfer</Typography>
                <Typography>
                    {"From: " +
                        sourceAccount?.institution +
                        " " +
                        sourceAccount?.name}
                </Typography>
                <Button
                    variant="secondary"
                    onClick={() => {
                        dispatch({
                            type: "CHANGE_VIEW",
                            page: "selectAccount",
                            accountSelectType: "source",
                        });
                    }}
                >
                    Edit
                </Button>
                <Typography>
                    {"To: " +
                        destinationAccount?.institution +
                        " " +
                        destinationAccount?.name}
                </Typography>
                <Button
                    variant="secondary"
                    onClick={() => {
                        dispatch({
                            type: "CHANGE_VIEW",
                            page: "selectAccount",
                            accountSelectType: "destination",
                        });
                    }}
                >
                    Edit
                </Button>
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
                <Button
                    variant="primary"
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
    } else if (state.page === "selectAccount") {
        return (
            <Stack spacing={2}>
                <Typography>Select Account</Typography>

                <Button variant="mini" onClick={goBack}>
                    Back
                </Button>
                <AccountManagementComponent
                    onSelected={onAccountSelected}
                    includeWallet={true}
                ></AccountManagementComponent>
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
