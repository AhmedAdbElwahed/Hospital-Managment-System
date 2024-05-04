import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        console.log(storedAccessToken);
        console.log("use effect is working");

        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (refreshToken) {
                refreshRequest(refreshToken);
            }
        }, 86400000);

        return () => clearInterval(interval);
    }, [refreshToken]);

    const refreshRequest = async (refreshToken) => {
        try {
            const response = await axios.post("http://localhost:8080/hms/v1/auth/refresh-token", null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            const { access_token, refresh_token } = response.data;
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", access_token);

        } catch (error) {
            setAccessToken('');
            setRefreshToken('');

            // Clear tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }


    }

    const login = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:8080/hms/v1/auth/login", credentials);
            const { access_token, refresh_token } = response.data;
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", access_token);
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    }

    const logout = async (token) => {
        try {
            const response = await axios.post("http://localhost:8080/hms/v1/auth/logout", null, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = response.data
            console.log("response", data)
            setAccessToken('');
            setRefreshToken('');

            // Clear tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error("error logging out", error);
        }

    };

    const data = {
        accessToken,
        refreshToken,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
