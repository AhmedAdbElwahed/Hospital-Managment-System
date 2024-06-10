// authSlice.js
import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, refreshTokenRequest} from "./authActions";

const userTokens = localStorage.getItem('userTokens') ?
    JSON.parse(localStorage.getItem('userTokens')) : null;

const initialState = {
    loading: false,
    userTokens,
    error: null,
    success: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userTokens = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshTokenRequest.fulfilled, (state, action) => {
                state.userTokens = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userTokens = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
