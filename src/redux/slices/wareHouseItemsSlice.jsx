import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
}

const wareHouseItemsSlice= createSlice({
    name:'wareHouseItems',
    initialState,
    reducers:{
        saveItem:(state,action)=>{
            state.items.push(action.payload);
        }
    }
})

export const {saveItem} = wareHouseItemsSlice.actions;

export default wareHouseItemsSlice.reducer;