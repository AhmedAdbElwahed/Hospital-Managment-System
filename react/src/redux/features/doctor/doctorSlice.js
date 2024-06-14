// import {createSlice} from "@reduxjs/toolkit";
// import {fetchAllDoctors, registerDoctor} from "./doctorActions";
//
// const initialState = {
//     loading: false,
//     doctors: [],
//     error: null,
// }
//
// const doctorSlice = createSlice({
//     name: 'doctor',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerDoctor.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerDoctor.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(registerDoctor.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.error = null;
//             })
//             .addCase(fetchAllDoctors.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAllDoctors.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.error = null;
//                 state.doctor = action.payload;
//             })
//             .addCase(fetchAllDoctors.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//                 state.doctor = state.doctor.clear();
//             });
//     }
//
// });
//
// export default doctorSlice.reducer;