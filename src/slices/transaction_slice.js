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
    async (userId) => {
        // const dwolla = dwollaInterface(
        //     dwollaSandboxConfig.url,
        //     dwollaCallWrapper
        // );
        // const rawTransferObject = await dwolla.searchTransfers(userId);
        // console.log(rawTransferObject);
        // const transferArray = getTransferArrayFromQuery(rawTransferObject);
        // // const namedTransferArray = await Promise.all(
        // //     transferArray.map(async (transfer) => {
        // //         const sourceInfo = await dwolla.getFundingSource(
        // //             getTransferSourceFundingId(transfer)
        // //         );
        // //         const destInfo = await dwolla.getFundingSource(
        // //             getTransferDestinationFundingId(transfer)
        // //         );
        // //         console.log(sourceInfo);
        // //         console.log(destInfo);
        // //         return { ...transfer };
        // //     })
        // // );
        // console.log(transferArray);
        // // console.log(namedTransferArray);
        // return transferArray;
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
        // builder
        //     .addCase(fetchTransactions.pending, (state, action) => {
        //         state.status = "loading";
        //     })
        //     .addCase(fetchTransactions.fulfilled, (state, action) => {
        //         state.status = "succeeded";
        //         // actually add the retrieved transactions
        //         state.loadedTransactions.push(...action.payload);
        //     })
        //     .addCase(fetchTransactions.rejected, (state, action) => {
        //         state.status = "failed";
        //         console.log(action.error);
        //         state.error = action.error.message;
        //     })
        //     .addCase(createTransaction.fulfilled, (state, action) => {
        //         state.loadedTransactions.push(action.payload);
        //     });
    },
});

export const selectTransactions = (state) =>
    state.transactions.loadedTransactions;

export default transactionSlice.reducer;
