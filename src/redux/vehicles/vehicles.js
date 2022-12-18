import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import carService from '../../services/services';

const initialState = {
  cars: [],
  car: {},
  loading: false,
  error: null,
};

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await carService.getAllCars();
    return response.data;
  },
);

export const fetchVehicle = createAsyncThunk(
  'vehicles/fetchVehicle',
  async (id) => {
    const response = await carService.getCar(id);
    return response.data;
  },
);

export const createVehicle = createAsyncThunk(
  'vehicles/createVehicle',
  async (data) => {
    const response = await carService.createCar(data);
    return response.data;
  },
);

export const updateVehicle = createAsyncThunk(
  'vehicles/updateVehicle',
  async (data) => {
    const response = await carService.updateCar(data.id, data);
    return response.data;
  },
);

export const removeVehicle = createAsyncThunk(
  'vehicles/removeVehicle',
  async (id) => {
    const response = await carService.removeCar(id);
    return response.data;
  },
);

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVehicles.pending]: (state) => {
      const thestate = state;
      thestate.loading = true;
    },
    [fetchVehicles.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.cars = action.payload;
    },
    [fetchVehicles.rejected]: (state, action) => {
      const thestate = state;
      thestate.error = action.error.message;
    },
    [fetchVehicle.pending]: (state) => {
      const thestate = state;
      thestate.loading = true;
    },
    [fetchVehicle.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.car = action.payload;
    },
    [fetchVehicle.rejected]: (state, action) => {
      const thestate = state;
      thestate.error = action.error.message;
    },

    [createVehicle.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.cars.push(action.payload);
    },
    [createVehicle.rejected]: (state, action) => {
      const thestate = state;
      thestate.error = action.error.message;
    },

    [updateVehicle.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.state = action.payload;
    },
    [updateVehicle.rejected]: (state, action) => {
      const thestate = state;
      thestate.error = action.error.message;
    },

    [removeVehicle.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.cars = state.cars.filter((car) => car.id !== action.payload.id);
    },
    [removeVehicle.rejected]: (state, action) => {
      const thestate = state;
      thestate.error = action.error.message;
    },
  },
});

export default vehiclesSlice.reducer;
