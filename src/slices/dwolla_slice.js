import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
    dwollaInterface,
    getTransferArrayFromQuery,
} from "../dwolla/dwolla_api_interface";
import { dwollaSandboxConfig } from "../dwolla/dwolla_settings";
import { dwollaCallWrapper } from "../firebase/cloud_functions";

// const initialState = [
//     { id: "1", title: "First Post!", content: "Hello!" },
//     { id: "2", title: "Second Post...", content: "More text" },
//     { id: "3", title: "Third Post...", content: "More text" },
// ];

const initialState = {
    transactions: [],
    status: "idle",
    error: null,
};

const userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";

export const fetchTransactions = createAsyncThunk(
    "dwolla/fetchTransactions",
    async () => {
        const dwolla = dwollaInterface(
            dwollaSandboxConfig.url,
            dwollaCallWrapper
        );

        const rawTransferObject = await dwolla.searchTransfers(userDwollaId);

        const transferArray = getTransferArrayFromQuery(rawTransferObject);

        console.log(transferArray);

        return transferArray;
    }
);

export const createTransaction = createAsyncThunk(
    "dwolla/createTransaction",
    async (initialTransaction) => {
        const resp = await new Promise((res) => setTimeout(res, 2500));

        return initialTransaction;
    }
);

const dwollaSlice = createSlice({
    name: "dwolla",
    initialState,
    reducers: {
        addTransaction(state, action) {
            state.push(action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = "succeeded";
                // actually add the retrieved transactions
                state.transactions.push(...action.payload);
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
            });
    },
});

export const { addTransaction } = dwollaSlice.actions;

export const selectTransactions = (state) => state.dwolla.transactions;
export const totalTransactions = (state) => state.dwolla.transactions.length;

export default dwollaSlice.reducer;
