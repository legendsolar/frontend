import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", title: "First Post!", content: "Hello!" },
    { id: "2", title: "Second Post", content: "More text" },
];

const dwollaSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
});

export const transactionSelector = (state) => state.dwolla;

export default dwollaSlice.reducer;
