import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut ,selectCurrentAccessToken} from '../../features/auth/authSlice';
import axios from 'axios';

const baseUrl = "https://meteradmin.buywater.store";//"http://localhost:4000";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    //credentials: 'include',
    prepareHeaders: (async (headers,{getState})=>{
        const token = await localStorage.getItem('token');//getState().auth.token;
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers;
    })
});

const baseQueryWithReauth = async (args,api,extraOptions)=>{
     let result = await baseQuery(args,api,extraOptions);

     if(result?.error?.status === 403){
         console.log("sending refresh token");
         const refreshResult = baseQuery('/refresh',api,extraOptions);
         //console.log(refreshResult);
         if(refreshResult?.data){
            const user = await localStorage.getItem('user');//api.getState().auth.user;
            // store the new toke
            api.dispatch(setCredentials(...refreshResult.data,user));
            // retry the originl request with new access token
            result = baseQuery(args,api,extraOptions);
         }
         else{
            api.dispatch(logOut());
         }
     }
     return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder =>({})
});


export const apiRequest = {
    get: async (url)=>{
         try{
            const token = await localStorage.getItem('token');//getState().auth.token;
            let headers = {};
            if(token){
                headers["Authorization"] = `Bearer ${token}`;
            }
            
            let result = await axios.get(baseUrl+url,{
                headers: headers
            });
            return result;
         }
         catch(err){
             throw {status: 500,message: err};
         }
    }
}