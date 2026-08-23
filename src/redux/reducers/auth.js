import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        authModal: false,
        redirectPath: null,
    },
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
        },

        userNotExists: (state) => {
            state.user = null;
        },

        openAuthModal: (state, action) => {
            state.authModal = true;
            state.redirectPath = action.payload;
        },

        closeAuthModal: (state) => {
            state.authModal = false;
        },
    },
});

export const {
    userExists,
    userNotExists,
    openAuthModal,
    closeAuthModal,
} = authSlice.actions;

export default authSlice.reducer;