import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { useAuth } from "../hooks/use_auth";

const initialState = {
    balance: {
        value: null,
        status: "idle",
        error: null,
    },
};

const userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";
const userWalletId = "da85e28e-2dfb-4690-bfe7-b53818214da3";
const userCheckingId = "8aa7d0a0-d563-45a1-9c8d-7fb441230636";

export const fetchWalletBalance = createAsyncThunk(
    "dwolla/fetchWalletBalance",
    async (cloudFunctions) => {
        const returned = await cloudFunctions.getWalletBalance();
        console.log(returned);
        const balance = returned.data.balance;
        return balance;
    }
);

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchWalletBalance.pending, (state, action) => {
                state.balance.status = "loading";
            })
            .addCase(fetchWalletBalance.fulfilled, (state, action) => {
                state.balance.status = "succeeded";
                state.balance.value = action.payload;
            })
            .addCase(fetchWalletBalance.rejected, (state, action) => {
                state.balance.status = "failed";
                state.balance.error = action.error.message;
            });
    },
});

export const selectWalletBalance = (state) => {
    if (state.wallet.balance.value) {
        return state.wallet.balance.value;
    }

    return null;
};

export default walletSlice.reducer;
