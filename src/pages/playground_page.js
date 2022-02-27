import { Paper, Typography, Stack, Button } from "@mui/material";
import DefaultView from "../views/default_view";

import { useSelector, useDispatch } from "react-redux";
import {
    decrement,
    increment,
    incrementAsync,
    selectCount,
} from "../slices/counter_slice";

import { transactionSelector } from "../slices/dwolla_slice";

const PlaygroundPage = () => {
    const count = useSelector(selectCount);
    const transactions = useSelector(transactionSelector);
    const dispatch = useDispatch();

    return (
        <DefaultView>
            <Paper variant="container">
                <Typography variant="smallHeadline">Documents</Typography>
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "500px" }}
                >
                    <Button onClick={() => dispatch(increment())}>+</Button>
                    <Button onClick={() => dispatch(decrement())}>-</Button>

                    <Button onClick={() => dispatch(incrementAsync(1, 5000))}>
                        + (5s)
                    </Button>
                    <Button onClick={() => dispatch(incrementAsync(-1, 5000))}>
                        - (5s)
                    </Button>

                    <Typography>{count}</Typography>
                </Stack>
            </Paper>
        </DefaultView>
    );
};

export default PlaygroundPage;
