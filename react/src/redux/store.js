import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../redux/features/auth/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true
});

export default store;