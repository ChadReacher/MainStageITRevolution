import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

// Name of the slice
const AUTH_SLICE_NAME = 'auth'

const user = JSON.parse(localStorage.getItem('user'))?.user
const authLocal =  JSON.parse(localStorage.getItem('isAuth'))?.isAuth

const initialState = {
    userData: user ? user : null,
    isAuth: authLocal ? authLocal: false,
    loading: false,
    authError: false,
    registerError: false,
    updateUserError: false,
    isAuthError: false,
    logoutError: false,
};

// Async action
export const auth = createAsyncThunk(
    `${AUTH_SLICE_NAME}/fetch-auth`,
    async (data) => {
        console.log(data)
        const response =  await axios.post('https://mainstage-it-revolution.herokuapp.com/login', {...data});
        return response.data;
    }
);



export const register = createAsyncThunk(
    `${AUTH_SLICE_NAME}/fetch-register`,
    async (data) => {
        const response = await axios.post('https://mainstage-it-revolution.herokuapp.com/api/v1/auth', {...data});
        console.log(data)
        return response.data;
    }
);

export const userLogout = createAsyncThunk(
    `${AUTH_SLICE_NAME}/fetch-logout`,
    async () => {
        await axios.post('https://webitrevolution.herokuapp.com/logout');
    }
);


// Slice
export const authSlice = createSlice({
    name: AUTH_SLICE_NAME,
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state = initialState
        }
    },
    extraReducers: {
        [auth.pending]: (state) => {
            state.loading = true
        },
        [auth.rejected]: (state) => {
            state.authError = true
            state.loading = false
        },
        [auth.fulfilled]: (state, action) => {
            state.userData = action.payload
            state.isAuth = true
            state.loading = false
            localStorage.setItem('isAuth', JSON.stringify({isAuth: true}))
            localStorage.setItem('user', JSON.stringify({user: action.payload}))
        },

        [register.pending]: (state) => {
            state.loading = true
        },
        [register.rejected]: (state) => {
            state.registerError = true
            state.loading = false
        },
        [register.fulfilled]: (state, action) => {
            state.userData = action.payload
            state.isAuth = true

            localStorage.setItem('isAuth', JSON.stringify({isAuth: true}))
            localStorage.setItem('user', JSON.stringify({user: action.payload}))
            state.loading = false
        },
        
        [userLogout.pending]: (state) => {
            state.loading = true
        },
        [userLogout.rejected]: (state) => {
            state.logoutError = true
            state.loading = false
        },
        [userLogout.fulfilled]: (state, action) => {
            state.isAuth = false;
            state.loading = false
        },

    },
});

// Selectors
export const selectAuthLoading = (state) => state.auth.loading;
export const selectIsAuth = (state) => state.auth.isAuth;

export const selectRegisterError = (state) => state.auth.registerError;
export const selectAuthError = (state) => state.auth.authError;
export const selectUpdateUserError = (state) => state.auth.updateUserError;

export const selectUserData= (state) => state.auth.userData;


export const {resetAuthState} = authSlice.actions


// Reducer
export const authReducer = authSlice.reducer;