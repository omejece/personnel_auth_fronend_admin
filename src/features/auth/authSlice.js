
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, accessToken: null, isLoggedIn: false},
    reducers:{
        setCredentials: (state,action)=>{
             const payload = action.payload;
             state.user = payload.user;
             state.accessToken = payload.token;
             state.isLoggedIn = true;
             localStorage.setItem('user', JSON.stringify(payload.user));
             localStorage.setItem('token', payload.token);
        },
        refreshCredential:  (state,action)=>{
            state.user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
            state.accessToken =  localStorage.getItem('token');
            state.isLoggedIn =  localStorage.getItem('token') ? true : false;
        },
        logOut: (state,action)=>{
            state.accessToken = null;
            localStorage.setItem('token', null);
            localStorage.setItem('user', null);
            state.isLoggedIn = false;
            state.user = null;
        }
    },
});

export const {setCredentials,logOut,refreshCredential} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state)=> localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
export const selectCurrentAccessToken = (state)=> localStorage.getItem('token');

