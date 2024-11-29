import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        setUsers: (state,action)=>{
            state.users = action.payload;
        },
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        removeUser:(state,action)=>{
            var foundIndex = state.users.findIndex(user=>user.userKey == action.userKey);
            state.user.splice(foundIndex,1);
        }
    }
});

export const {
    setUsers,
    setUser,
    removeUser
}  =  userSlice.actions;

export default userSlice.reducer;
export const selectAllUsers = (state)=> state.users;
export const selectedUser = (state)=> state.user;