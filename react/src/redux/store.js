import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../redux/features/auth/authSlice'
import doctorReducer from '../redux/features/doctor/doctorSlice'
import {setupAxiosInterceptors} from "../util/axiosApi";
import {refreshTokenRequest} from "./features/auth/authActions";

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer
    },
    devTools: true
});
setupAxiosInterceptors(store, refreshTokenRequest);
export default store;