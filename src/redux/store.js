import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/reducers/auth.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});