import axios from "axios";
import {jwtDecode} from "jwt-decode";


const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const axiosPublic = axios.create({
    baseURL: baseUrl,
});

export const axiosPrivate = axios.create({
    baseURL: baseUrl,
});


export const setupAxiosInterceptors = (store, refreshTokenRequest) => {
    axiosPrivate.interceptors.request.use(
        async (config) => {
            const userTokens = store.getState().auth.userTokens;
            let currentDate = new Date();
            if (userTokens.access_token) {
                const decodedToken = jwtDecode(userTokens.access_token);
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    await store.dispatch(refreshTokenRequest(userTokens.refresh_token));
                }
                if (config.headers) {
                    config.headers["Authorization"] = `Bearer ${
                        store.getState().auth.userTokens.access_token
                    }`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}
