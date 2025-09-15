import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 aclData:{},
 sidebarDataForUser:[]
};

const aclSlice = createSlice({
  name: 'acl',
  initialState,
  reducers: {
    saveAclData: (state,action) => {
        state.aclData = action.payload;
        state.sidebarDataForUser = Object.keys(action.payload.pageFunction);
    }
},
 
});

export const { saveAclData } = aclSlice.actions;

export default aclSlice.reducer;
