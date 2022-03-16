import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { dwollaCallWrapper } from "../hooks/use_cloud_functions";

const initialState = {
    loadedTransactions: [],
    status: "idle",
    error: null,
};

const userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";
const userWalletId = "da85e28e-2dfb-4690-bfe7-b53818214da3";
const userCheckingId = "8aa7d0a0-d563-45a1-9c8d-7fb441230636";

export const fetchTransactions = createAsyncThunk(
    "dwolla/fetchTransactions",
    async (cloudFunctions) => {
        const transactions = (
            await cloudFunctions.getRecentTransfers({
                count: 10,
            })
        ).data.transfers;

        console.log("transactions");
        console.log(transactions);

        const transformedTransactionList = transactions.map((transaction) => {
            console.log(transaction);
            return {
                title: "Unknown",
                id: transaction.id,
                source: transaction.sourceId,
                destination: transaction.destinationId,
                amount: transaction.amount,
                created: new Date(transaction.created),
                status: transaction.status,
            };
        });

        console.log(transformedTransactionList);

        return transformedTransactionList;
    }
);

export const createTransaction = createAsyncThunk(
    "dwolla/createTransaction",
    async (initialTransaction) => {
        // const dwolla = dwollaInterface(
        //     dwollaSandboxConfig.url,
        //     dwollaCallWrapper
        // );
        // console.log("sent");
        // const resp = await dwolla.createTransfer(
        //     userWalletId,
        //     userCheckingId,
        //     0.99
        // );
        // console.log("returned");
        // console.log(resp);
        // const transactionId = getIdFromHeader(resp);
        // const verificationResp = await dwolla.getTransferById(transactionId);
        // return verificationResp;
    }
);

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = "succeeded";
                // actually add the retrieved transactions
                state.loadedTransactions.push(...action.payload);
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loadedTransactions.push(action.payload);
            });
    },
});

export const selectTransactions = (state) =>
    state.transactions.loadedTransactions;

export default transactionSlice.reducer;
