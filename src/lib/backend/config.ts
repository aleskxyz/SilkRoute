import axios from "axios";

export const baseURL = "https://napi.arvancloud.ir/caas/v2/zones"

export const zone = "ir-thr-ba1"

export const namespace = "silkroute"

export const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
