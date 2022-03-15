import { ResetTvRounded } from "@mui/icons-material";
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { useAuth } from "../hooks/use_auth";

const initialState = {
    balance: {
        value: null,
        id: null,
        status: "idle",
        error: null,
    },
    accounts: {
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
        return {
            balance: balance,
            id: returned.data.walletId,
        };
    }
);

export const fetchAccounts = createAsyncThunk(
    "dwolla/fetchAccounts",
    async (cloudFunctions) => {
        const returned = await cloudFunctions.getLinkedAccounts();

        console.log("linked accounts");
        console.log(returned);

        const accounts = returned.data.map((returnedAccount) => {
            const [institution, type, name] = returnedAccount.name.split("|");

            return {
                name: name,
                institution: institution,
                type: returnedAccount.bankAccountType,
                id: returnedAccount.id,
                source: "Linked with Plaid",
            };
        });

        console.log(accounts);

        return accounts;
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
                state.balance.value = action.payload.balance;
                state.balance.id = action.payload.id;
            })
            .addCase(fetchWalletBalance.rejected, (state, action) => {
                state.balance.status = "failed";
                state.balance.error = action.error.message;
            });

        builder
            .addCase(fetchAccounts.pending, (state, action) => {
                state.accounts.status = "loading";
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.accounts.status = "succeeded";
                state.accounts.value = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.accounts.status = "failed";
                state.accounts.error = action.error.message;
            });
    },
});

export const selectAllAccounts = (state) => {
    if (state.wallet.accounts.value) {
        return state.wallet.accounts.value;
    }

    return null;
};

export const selectWalletBalance = (state) => {
    if (state.wallet.balance.value) {
        return state.wallet.balance.value;
    }

    return null;
};

export const selectWalletId = (state) => {
    if (state.wallet.balance.id) {
        return state.wallet.balance.id;
    }

    return null;
};

export default walletSlice.reducer;
