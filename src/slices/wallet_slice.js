import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { useAuth } from "../hooks/use_auth";

const initialState = {
    loadedWallet: {},
    status: "idle",
    error: null,
};

const userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";
const userWalletId = "da85e28e-2dfb-4690-bfe7-b53818214da3";
const userCheckingId = "8aa7d0a0-d563-45a1-9c8d-7fb441230636";

export const fetchWallet = createAsyncThunk(
    "dwolla/fetchWallet",
    async (userId) => {
        // console.log("wallet");
        // console.log(userId);
        // const dwolla = dwollaInterface(
        //     dwollaSandboxConfig.url,
        //     dwollaCallWrapper
        // );
        // const userFundingSources = await dwolla.getCustomerFundingSources(
        //     userId
        // );
        // const walletId = getWalletIdFromFundingSources(userFundingSources);
        // const walletObject = await dwolla.getWalletInfo(walletId);
        // return walletObject;
    }
);

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // builder
        //     .addCase(fetchWallet.pending, (state, action) => {
        //         state.status = "loading";
        //     })
        //     .addCase(fetchWallet.fulfilled, (state, action) => {
        //         state.status = "succeeded";
        //         // actually add the retrieved transactions
        //         state.loadedWallet = action.payload;
        //     })
        //     .addCase(fetchWallet.rejected, (state, action) => {
        //         state.status = "failed";
        //         console.log(action.error);
        //         state.error = action.error.message;
        //     });
    },
});

export const selectWallet = (state) => state.wallet.loadedWallet;

export const selectWalletTotal = (state) => {
    try {
        return state.wallet.loadedWallet.total.value;
    } catch (error) {
        return "-";
    }
};

export default walletSlice.reducer;
