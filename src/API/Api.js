import axios from "axios";

export const Axios = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

});

Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginAPI = 'api/auth/login';
export const signUpAPI = 'api/auth/register';
export const getAllEvents = 'api/events';
export const addNewEvent = 'api/events';
export const bookEvent = 'api/bookings';