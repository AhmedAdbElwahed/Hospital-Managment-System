import {createSlice} from "@reduxjs/toolkit";
import {loginUser} from "./authActions";


const userTokens = localStorage.getItem('userTokens') ?
    localStorage.getItem('userTokens') : null;

const initialState = {
    loading: false,
    userTokens,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                console.log("action_type: ", action.type);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userTokens = action.payload;
                console.log(action.payload);
                console.log("action_type: ", action.type);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("action_type: ", action.type)
            })
    }
});

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;