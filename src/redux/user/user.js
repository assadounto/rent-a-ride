import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/services';

const initialState = {
  user: {},
  loading: false,
  error: null,
  islogin: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (data) => {
    const response = await userService.login(data);
    localStorage.setItem('token', response.data.jwt);
    return response.data;
  },
);

export const signup = createAsyncThunk(
  'user/signup',
  async (data) => {
    const response = await userService.signup(data).then((response) => response.data)
      .catch((error) => error.response.data);
    return response;
  },
);

export const autoLogin = createAsyncThunk(
  'user/auto_login',
  async () => {
    const response = await userService.autoLogin();
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.loading = false;
      thestate.user = action.payload;
      localStorage.setItem('token', action.payload.jwt);
      thestate.user = action.payload.current_user;
      window.location.href = '/';
      thestate.islogin = true;
    },
    [login.rejected]: (state) => {
      const thestate = state;
      thestate.error = 'Wrong Email or Password';
    },
    [autoLogin.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.user = action.payload;
    },
    [signup.fulfilled]: (state, action) => {
      const thestate = state;
      thestate.user = action.payload;
    },
    [signup.rejected]: (state, action) => {
      const thestate = state;
      thestate.error = action.payload.error;
    },
  },
});

export const { logout, status } = userSlice.actions;

export default userSlice.reducer;
