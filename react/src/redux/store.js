import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../redux/features/auth/authSlice'
// import doctorReducer from '../redux/features/doctor/doctorSlice'
import {setupAxiosInterceptors} from "../util/axiosApi";
import {refreshTokenRequest} from "./features/auth/authActions";
import {doctorApi} from "./features/doctor/doctorApiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // doctor: doctorReducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(doctorApi.middleware),
    devTools: true
});
setupAxiosInterceptors(store, refreshTokenRequest);
setupListeners(store.dispatch);
export default store;
