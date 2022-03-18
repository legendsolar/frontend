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
            var title = "Unkown";
            if (transaction.sourceAccountMetaData.type === "wallet") {
                title = "Wallet to Bank Transfer";
            }

            if (transaction.destinationAccountMetaData.type === "wallet") {
                title = "Solar Dividend Payout";
            }

            return {
                title: title,
                id: transaction.id,
                sourceName: transaction.sourceAccountMetaData.name,
                sourceId: transaction.sourceAccountMetaData.dwollaId,
                sourceMask: transaction.sourceAccountMetaData.mask,

                destinationName: transaction.destinationAccountMetaData.name,
                destinationId: transaction.destinationAccountMetaData.dwollaId,
                destinationMask: transaction.destinationAccountMetaData.mask,

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
    reducers: {
        clearTransactionState(state) {
            return initialState;
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

export const { clearTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
