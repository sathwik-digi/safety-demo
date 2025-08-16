import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 ownershipIdentityData:{},
 factoryOwnershipIdentityData:{}
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    saveOwnershipIdentityData: (state,action) => {
        state.ownershipIdentityData = action.payload;
    },
    saveFactoryOwnershipIdentityData: (state,action) => {
        state.factoryOwnershipIdentityData = action.payload;
    },
    clearData:(state)=>{
        state.ownershipIdentityData = {},
        state.factoryOwnershipIdentityData = {}
    }
},
 
});

export const { saveOwnershipIdentityData, saveFactoryOwnershipIdentityData, clearData  } = registrationSlice.actions;

export default registrationSlice.reducer;
