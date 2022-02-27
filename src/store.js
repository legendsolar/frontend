import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter_slice";
import dwollaReducer from "./slices/dwolla_slice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        dwolla: dwollaReducer,
    },
});
