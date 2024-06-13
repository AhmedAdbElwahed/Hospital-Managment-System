import {createSlice} from "@reduxjs/toolkit";
import {registerDoctor} from "./doctorActions";

const initialState = {
    loading: false,
    doctors: [],
    error: null,
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            });
    }

});

export default doctorSlice.reducer;