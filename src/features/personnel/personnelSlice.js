import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personnels:[],
    personnel: null
}

const PersonnelSlice = createSlice({
    name: 'personnel',
    initialState: initialState,
    reducers:{
        setPersonnels: (state,action)=>{
            state.personnels = action.payload;
        },
        setPersonnel:(state,action)=>{
            state.personnel = action.payload;
        },
        reloadPersonnels:(state,action)=>{
            state.personnels = action.payload;
        },
        removePersonnel:(state,action)=>{
            var foundIndex = state.personnels.findIndex(personnel=>personnel.imei == action.imei);
            state.personnels.splice(foundIndex,1);
        }
    }
});

export const {
    setPersonnels,
    setPersonnel,
    removePersonnel,
    reloadPersonnels
}  =  PersonnelSlice.actions;

export default PersonnelSlice.reducer;
export const selectAllPersonnels = (state)=> state.personnels;
export const selectedPersonnel = (state)=> state.personnel;