import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getUserSignUpState } from "../hooks/use_cloud_functions";

const userSignUpStates = {
    ACCOUNT_CREATED: {},
    ACCREDATION_VERIF_COMPLETE: {},
    DWOLLA_ACCOUNT_VERIFIED: {},
};

const initialState = {
    signUpState: {
        value: null,
        status: "idle",
        error: null,
    },
};

const userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";
const userWalletId = "da85e28e-2dfb-4690-bfe7-b53818214da3";
const userCheckingDWOLLA_ACCOUNT_VERIFIEDId =
    "8aa7d0a0-d563-45a1-9c8d-7fb441230636";

export const fetchUserSignUpState = createAsyncThunk(
    "user/fetchUserState",
    async (cloudFunctions) => {
        const resp = await cloudFunctions.getUserSignUpState();
        return resp.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserSignUpState.pending, (state, action) => {
                state.signUpState.status = "loading";
            })
            .addCase(fetchUserSignUpState.fulfilled, (state, action) => {
                state.signUpState.status = "succeeded";
                state.signUpState.value = action.payload;
            })
            .addCase(fetchUserSignUpState.rejected, (state, action) => {
                state.signUpState.status = "failed";
                state.signUpState.error = action.error.message;
            });
    },
});

export const selectUserSignUpState = (state) => {
    try {
        return state.user.signUpState.value;
    } catch (error) {
        return "UNKNOWN";
    }
};

export default userSlice.reducer;
