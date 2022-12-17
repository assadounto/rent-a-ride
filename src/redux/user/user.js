import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {userService} from '../../services/services';

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
        return response.data;
    }
);

export const signup = createAsyncThunk(
    'user/signup',
    async (data) => {
        const response = await userService.signup(data).then(response=>{return response.data}).
        catch(error=>{return error.response.data});
        return response
    }
);


export const auto_login = createAsyncThunk(
    'user/auto_login',
    async () => {
        const response = await userService.auto_login();
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('token',action.payload.jwt);
            state.user=action.payload.current_user
            window.location.href="/"
            state.islogin = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error="Wrong Email or Password" 
        },
        [auto_login.fulfilled]: (state, action) => {
            state.user= action.payload
            state.islogin=true
            
        },
        [signup.pending]: (state) => {
            state.loading = true;
        },
        [signup.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;

        },
        [signup.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        }
    }
});

export const {logout,status} = userSlice.actions;

export default userSlice.reducer;