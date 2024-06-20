export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;