import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { dwollaInterface } from "../dwolla/dwolla_api_interface";
import { dwollaSandboxConfig } from "../dwolla/dwolla_settings";
import { dwollaCallWrapper } from "../firebase/cloud_functions";

// const initialState = [
//     { id: "1", title: "First Post!", content: "Hello!" },
//     { id: "2", title: "Second Post...", content: "More text" },
//     { id: "3", title: "Third Post...", content: "More text" },
// ];

const initialState = {
    loadedWallet: {},
    status: "idle",
    error: null,
};

const userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";
const userWalletId = "da85e28e-2dfb-4690-bfe7-b53818214da3";
const userCheckingId = "8aa7d0a0-d563-45a1-9c8d-7fb441230636";

export const fetchWallet = createAsyncThunk("dwolla/fetchWallet", async () => {
    console.log("wallet");
    const dwolla = dwollaInterface(dwollaSandboxConfig.url, dwollaCallWrapper);

    const walletObject = await dwolla.getWalletInfo(userWalletId);

    console.log(walletObject);

    return walletObject;
});

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchWallet.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchWallet.fulfilled, (state, action) => {
                state.status = "succeeded";
                // actually add the retrieved transactions
                state.loadedWallet = action.payload;
            })
            .addCase(fetchWallet.rejected, (state, action) => {
                state.status = "failed";
                console.log(action.error);
                state.error = action.error.message;
            });
    },
});

export const selectWallet = (state) => state.wallet.loadedWallet;
export const selectWalletTotal = (state) =>
    state.wallet.loadedWallet.total.value;

export default walletSlice.reducer;
