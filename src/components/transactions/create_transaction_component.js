import {
    Stack,
    Button,
    Typography,
    TextField,
    InputAdornment,
} from "@mui/material";
import { useState, useReducer } from "react";

const CreateTransactionComponent = () => {
    const initialState = {
        pageDisplay: "setup",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "back":
                return;
            case "changeAccount":
                return;
            case "review":
                return;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const [transferAmount, setTransferAmount] = useState(0.0);

    if (state.pageDisplay === "setup") {
        return (
            <Stack spacing={2}>
                <Typography>Set up transfer</Typography>
                <Typography>From</Typography>
                <Typography>To</Typography>
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
                <Button variant="primary"> Review Transfer</Button>
            </Stack>
        );
    }

    return <></>;
};

export default CreateTransactionComponent;
