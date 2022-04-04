import { List, ListItem, Stack, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const accountNumberString = "•••• •••• •••• ••••";

const AccountList = ({ accounts, onSelected }) => {
    return (
        <List>
            {accounts.map((account, index) => (
                <ListItem
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
                </ListItem>
            ))}
        </List>
    );
};

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired,
};

AccountList.defaultProps = {};
export default AccountList;
