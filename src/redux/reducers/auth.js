import { createSlice } from "@reduxjs/toolkit";

const savedUser = (() => {
    try {
        const item = localStorage.getItem("user");
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
})();

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: savedUser,
        authModal: false,
        redirectPath: null,
    },
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            try {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } catch {}
        },

        userNotExists: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
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