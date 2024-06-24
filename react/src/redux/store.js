import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../redux/features/auth/authSlice'
import {setupAxiosInterceptors} from "../util/axiosApi";
import {refreshTokenRequest} from "./features/auth/authActions";
import {doctorApi} from "./features/doctor/doctorApiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {patientApi} from "./features/patient/patientApiSlice";
import {patientHistoryApi} from "./features/patientHistory/patientHistoryApiSlice";
import {appointmentApi} from "./features/appointment/appointmentApiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [patientHistoryApi.reducerPath]: patientHistoryApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            doctorApi.middleware,
            patientApi.middleware,
            patientHistoryApi.middleware,
            appointmentApi.middleware,
        ]),
    devTools: true
});
setupAxiosInterceptors(store, refreshTokenRequest);
setupListeners(store.dispatch);
export default store;
