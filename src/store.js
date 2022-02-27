import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter_slice";
import transactionReducer from "./slices/transaction_slice";
import walletReducer from "./slices/wallet_slice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        transactions: transactionReducer,
        wallet: walletReducer,
    },
});
