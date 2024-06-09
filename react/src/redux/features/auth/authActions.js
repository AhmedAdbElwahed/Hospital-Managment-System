import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = 'http://localhost:8080';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axios.post(
                `${backendUrl}/hms/v1/auth/login`,
                {email, password},
                config
            );
            localStorage.setItem("userTokens", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)