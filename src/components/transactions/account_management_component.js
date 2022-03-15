import { useEffect } from "react";
import { ListItemButton, Typography, List, Stack, Button } from "@mui/material";
import DefaultComponent from "../default_component";
import { useCloudFunctions } from "../../hooks/use_cloud_functions";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAccounts, fetchAccounts } from "../../slices/wallet_slice";
import LoadingComponent from "../loading_component";

const AccountManagementComponent = ({ onSelected, includeWallet }) => {
    const cloudFunctions = useCloudFunctions();
    const dispatch = useDispatch();
    const accountStatus = useSelector((state) => state.wallet.accounts.status);

    useEffect(() => {
        if (accountStatus === "idle") {
            dispatch(fetchAccounts(cloudFunctions));
        }
    }, [accountStatus, dispatch]);

    const accounts = useSelector(selectAllAccounts);

    if (!accounts || accountStatus !== "succeeded") {
        return <LoadingComponent></LoadingComponent>;
    }

    const accountNumberString = "•••• •••• •••• ••••";

    return (
        <div>
            <List>
                {accounts.map((account, index) => (
                    <ListItemButton
                        key={index}
                        sx={{ ml: -4, mr: -4 }}
                        onClick={() => {
                            if (onSelected) {
                                onSelected(account);
                            }
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent={"space-between"}
                            sx={{ width: "100%" }}
                        >
                            <Stack>
                                <Typography variant="subtitle1">
                                    {account.name}
                                </Typography>
                                <Typography variant="subtitle3">
                                    {account.source}
                                </Typography>
                            </Stack>

                            <Stack alignItems={"flex-end"}>
                                <Typography variant="subtitle1">
                                    {account.institution}
                                </Typography>
                                <Typography variant="subtitle3">
                                    {accountNumberString}
                                </Typography>
                                <Button variant="small" disable={false}>
                                    Remove
                                </Button>
                            </Stack>
                        </Stack>
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};

export default AccountManagementComponent;
