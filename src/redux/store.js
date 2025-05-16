import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookingSlice from './bookingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        booking: bookingSlice,
    },
});

export default store;