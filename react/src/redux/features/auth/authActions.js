// authActions.js
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosPublic} from "../../../util/axiosApi";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            console.log("from login: ", baseUrl);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axiosPublic.post(
                `${baseUrl}/hms/v1/auth/login`,
                {email, password},
                config
            );
            localStorage.setItem("userTokens", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async ({accessToken}, {rejectWithValue}) => {
        try {
            console.log("from logout: ",accessToken);
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };
            console.log(accessToken);
            const response = await axiosPublic.post(
                `${baseUrl}/hms/v1/auth/logout`,
                null,
                config);
            localStorage.removeItem("userTokens");
            return response;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const refreshTokenRequest = createAsyncThunk(
    'auth/refreshToken',
    async (refreshToken, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            }
            const response = await axiosPublic.post(`${baseUrl}/hms/v1/auth/refresh-token`, null, config);
            localStorage.setItem("userTokens", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
