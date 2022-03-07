import { useState, useEffect } from "react";
import {
    Stack,
    Button,
    Grid,
    Box,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import MetricList from "./summary/metric_list";
import TransactionComponent from "./transactions/transfer_component";

import { useSelector, useDispatch } from "react-redux";
import {
    fetchWalletBalance,
    selectWalletBalance,
} from "../slices/wallet_slice";

import { useCloudFunctions } from "../hooks/use_cloud_functions";

const Wallet = () => {
    const cloudFunctions = useCloudFunctions();
    const dispatch = useDispatch();
    const balanceStatus = useSelector((state) => state.wallet.balance.status);
    const walletBalance = useSelector(selectWalletBalance);

    const balance = walletBalance ? walletBalance : "-";

    useEffect(() => {
        if (balanceStatus === "idle") {
            dispatch(fetchWalletBalance(cloudFunctions));
        }
    }, [balanceStatus, dispatch]);

    const accounts = [
        {
            value: "Bank of America ****156",
            label: "Bank of America",
        },
        {
            value: "Chase ****451",
            label: "Chase",
        },
        {
            value: "RCU ****468",
            label: "Rural Credit Union",
        },
    ];

    const [transferAmount, setTransferAmount] = useState(0.0);
    const [bankAccount, setBankAccount] = useState(accounts[0].value);

    return (
        <div>
            <Stack>
                <Box
                    sx={{
                        bgcolor: "whiteFog.main",
                        mt: -2,
                        mr: -2,
                        ml: -2,
                        mb: 2,
                        pt: 2,
                        pl: 2,
                        pr: 2,
                        pb: 1,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"flex-end"}
                    >
                        <Stack>
                            <Typography variant="smallLabel">
                                {"Legends Wallet".toUpperCase()}
                            </Typography>
                            <Typography variant="headline2">
                                {"$" + balance}
                            </Typography>
                        </Stack>
                        <Box
                            sx={{
                                bgcolor: "light.main",
                                p: 1,
                                borderRadius: "5px 5px 0px 0px",
                                mb: -1,
                                mr: 3,
                            }}
                        >
                            <Typography variant="subtitle3">
                                Withdraw
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <TextField
                    name="amount"
                    type="number"
                    label="Amount"
                    variant="filled"
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

                <TextField
                    name="account"
                    label="Account"
                    variant="filled"
                    sx={{ mt: 2 }}
                    select
                    value={bankAccount}
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setBankAccount(value);
                    }}
                >
                    {accounts.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TransactionComponent
                    title={`From Wallet to ${bankAccount}`}
                    amount={parseFloat(transferAmount)}
                    source="Wallet"
                    destination={bankAccount}
                    date={new Date()}
                ></TransactionComponent>

                <Button variant="primary" disabled={true}>
                    Submit Withdraw
                </Button>

                <Button>View All Transactions</Button>
            </Stack>
        </div>
    );
};

export default Wallet;
