import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const expiresAt = localStorage.getItem('expiresAt');

const initialState = {
    token: token || null,
    expiresAt: expiresAt ? Number(expiresAt) : null,
};

const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {

        login: (state, action) => {
            const { token, expiresAt } = action.payload;
            state.token = token;
            state.expiresAt = expiresAt;

            localStorage.setItem('token', token);
            localStorage.setItem('expiresAt', expiresAt);
        },

        logout: (state) => {
            state.token = null;
            state.expiresAt = null;

            localStorage.removeItem('token');
            localStorage.removeItem('expiresAt');
        },

    },

});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
