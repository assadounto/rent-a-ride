import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingService } from '../../services/services';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    const response = await bookingService.getBookings();
    return response.data;
  },
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (data) => {
    const response = await bookingService.createBooking(data);
    return response.data;
  },
);

export const removeBooking = createAsyncThunk(
  'bookings/removeBooking',
  async (id) => {
    const response = await bookingService.removeBooking(id);
    return response.data;
  },
);

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBookings.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.loading = false;
      thestate.bookings = action.payload;
    },
    [fetchBookings.pending]: (state, action) => {
      const thestate = state;
      thestate.loading = true;
      thestate.bookings = action.payload;
    },
    [createBooking.pending]: (state) => {
      const thestate = state;
      thestate.loading = true;
    },
    [createBooking.fulfilled]: (state) => {
      const thestate = state;
      thestate.loading = false;
    },
  },
});

export default bookingsSlice.reducer;
