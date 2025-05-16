import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios, bookEvent } from '../API/Api';

export const bookEventFun = createAsyncThunk('booking/bookEventFun', async (eventId, {rejectWithValue}) => {

    try {

        const res = await Axios.post(bookEvent, { eventId });
        return { data: res.data, eventId };

    } catch (error) {
        console.error(error);
        return rejectWithValue({error, eventId });
    }

});

const bookingSlice = createSlice({

    name: 'booking',

    initialState: {
        loading: {},
        success: {},
        error: {},
    },

    reducers: {
        resetBookingState: (state) => {
            state.success = {};
            state.error = {};
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(bookEventFun.pending, (state, action) => {
                const eventId = action.meta.arg;
                state.loading[eventId] = true;
                state.success[eventId] = false;
                state.error[eventId] = false;
            })
            .addCase(bookEventFun.fulfilled, (state, action) => {
                const eventId = action.payload.eventId;
                state.loading[eventId] = false;
                state.success[eventId] = true;
            })
            .addCase(bookEventFun.rejected, (state, action) => {
                const eventId = action.payload?.eventId || action.meta.arg;
                state.loading[eventId] = false;
                state.error[eventId] = action.payload?.error || 'Unknown error';
            });
    },

});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
